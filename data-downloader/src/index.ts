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

async function fetchData(start: Date, end: Date): Promise<Score[]> {
  const { docs } = await historicCollection
    .orderBy("timestamp", "asc")
    .startAt(start.getTime() / 1000)
    .endBefore(end.getTime() / 1000)
    .get();

  return docs.map(doc => doc.data() as Score);
}

async function saveData(start: Date, end: Date, data: Score[]) {
  await fsPromise.mkdir("../data", {recursive: true});

  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  const startMonth = start.getUTCMonth() + 1;
  const endMonth = end.getUTCMonth() + 1;

  for (let year = startYear; year <= endYear; year++) {
    let monthStart = year === startYear ? startMonth : 1;
    let monthEnd = year === endYear ? endMonth : 12;
    for (let month = monthStart; month <= monthEnd; month++) {
      await saveOneMonth(year, month, data);
    }
  } 

  await fsPromise.writeFile("../data/latest.txt", end.toISOString(), { encoding: "utf-8"});
}

async function saveOneMonth(year: number, month: number, data: Score[]) {
  console.log(`Saving ${year}-${month}`);
  const path = `../data/${year}-${month}.json`;

  const start = new Date(`${year}-${month.toString().padStart(2, "0")}-01T00:00:00Z`);
  const end = new Date(start.getTime());
  end.setUTCMonth(end.getUTCMonth() + 1);

  const startTime = start.getTime() / 1000;
  const endTime = end.getTime() / 1000;

  const existingData: DataFile = await fsPromise
    .readFile(path, "utf-8")
    .catch(() => "{}")
    .then(data => JSON.parse(data));

  data
    .filter(elem => elem.timestamp >= startTime && elem.timestamp < endTime)
    .forEach(score => {
      existingData[score.timestamp] = formatScore(score)
    });

  await fsPromise.writeFile(path, JSON.stringify(existingData), { encoding: "utf-8" });
}

async function fetchAndSave(start: Date, end: Date) {
  const data = await fetchData(start, end);
  console.log(JSON.stringify(data));
  await saveData(start, end, data);
}

async function saveAll() {
  const start = new Date("2022-06-29T00:00:00Z");
  const end = new Date();
  await fetchAndSave(start, end);
}

async function saveSinceLatest() {
  const latestTime = await fsPromise.readFile("../data/latest.txt", "utf-8")
    .catch(error => {
      console.log("Error reading latest time");
      console.log(error);
      return "2022-06-29T00:00:00Z"
    });
  const start = new Date(latestTime);
  const end = new Date();
  await fetchAndSave(start, end);
}

saveSinceLatest();
