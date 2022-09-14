import { ReadlineParser, SerialPort } from "serialport";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"
import fs from "fs";

type Score = {
  timestamp: number;
  serenity: number;
  growth: number;
  belonging: number;
}

const port = new SerialPort({
  path: "/dev/ttyACM0",
  baudRate: 9600
});

let timer: NodeJS.Timeout | null = null;
let serenity: number = 0;
let growth: number = 0;
let belonging: number = 0;

const credentials = JSON.parse(fs.readFileSync("../credentials.json", "utf-8"));
const app = initializeApp({credential: cert(credentials)});
const db = getFirestore(app);

const currentDoc = db.doc("current/current");
const historicCollection = db.collection("/historic");

async function toFirestore() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const data: Score = { serenity, growth, belonging, timestamp };
  
  await Promise.all([
    currentDoc.update(data),
    historicCollection.add(data)
  ]);
  console.log(`Updated ${serenity}${growth}${belonging}`);
}

const lineStream = port.pipe(new ReadlineParser());
lineStream.on("data", (data: string) => {
  const newSerenity = parseInt(data[0]);
  const newGrowth = parseInt(data[1]);
  const newBelonging = parseInt(data[2]);

  if (timer !== null) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    timer = null;
    if (
      serenity !== newSerenity ||
      growth !== newGrowth ||
      belonging !== newBelonging
    ) {
      serenity = newSerenity;
      growth = newGrowth;
      belonging = newBelonging;
      toFirestore();
    }
  }, 1_000);
});

function toBalanceBox() {
  const data = `${serenity}${growth}${belonging}`;
  console.log(`From Remote: ${data}`);
  port.write(`${data}\n`, "ascii");
}

currentDoc.onSnapshot(snapshot => {
  const data = snapshot.data() as Score;
  serenity = data.serenity;
  growth = data.growth;
  belonging = data.belonging;
  toBalanceBox();
});
