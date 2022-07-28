import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"
import fs from "fs";
import fsPromise from "fs/promises";

type Score = { 
  personal: number;
  professional: number;
  spiritual: number;
  timestamp: number;
}
type DataFile = Record<number, [number, number, number]>;

function getCredentials(): any {
  const envCreds = process.env.FIREBASE_CREDENTIALS;
  if (envCreds !== undefined) return JSON.parse(envCreds);

  const credentials = JSON.parse(fs.readFileSync("../credentials.json", "utf-8"));
  return credentials;
}

const credential = cert(getCredentials());
const app = initializeApp({credential});
const db = getFirestore(app);

const historicCollection = db.collection("/historic");

function toUTC(date: Date): Date {
  return new Date(date.toUTCString());
}

function getDateBounds(date: Date): { start: number; end: number } {
  date = toUTC(date);
  date.setUTCHours(0, 0, 0, 0);
  const startMillis = date.getTime();
  const start = Math.floor(startMillis / 1000);

  date.setUTCDate(date.getUTCDate() + 1);
  const endMillis = date.getTime();
  const end = Math.floor(endMillis / 1000);

  return { start, end };
}

function formatScore(score: Score): [number, number, number] {
  return [score.personal, score.professional, score.spiritual];
}

async function fetchData(date: Date): Promise<DataFile> {
  const { start, end } = getDateBounds(date);
  
  const { docs } = await historicCollection
    .orderBy("timestamp", "asc")
    .startAt(start)
    .endBefore(end)
    .get();

  return docs
    .map(doc => doc.data() as Score)
    .reduce((acc, elem) => ({
      ...acc,
      [elem.timestamp]: formatScore(elem)
    }), {} as DataFile)
}

async function saveData(date: Date, data: DataFile) {
  date = toUTC(date);
  const path = `../data/${date.getUTCFullYear()}-${date.getUTCMonth() + 1}.json`;

  const existingData: DataFile = await fsPromise
    .readFile(path, "utf-8")
    .catch(() => "{}")
    .then(data => JSON.parse(data))

  const newData = {
    ...existingData,
    ...data
  };

  await fsPromise.mkdir("../data", {recursive: true})
  await fsPromise.writeFile(path, JSON.stringify(newData), { encoding: "utf-8" });
  
}

async function fetchAndSave(date: Date) {
  const data = await fetchData(date);
  console.log(JSON.stringify(data))
  await saveData(date, data);
}

async function saveAll() {
  const start = new Date("2022-06-29T00:00:00Z");
  const end = new Date();

  while (start < end) {
    console.log(start);
    await fetchAndSave(start);
    start.setUTCDate(start.getUTCDate() + 1);
  }
}

async function saveToday() {
  await fetchAndSave(new Date());
}

// TODO this should download all since the last event, rather than just the last day. Don't assume previous runs were a success
// TODO this should download labels too
saveToday();
