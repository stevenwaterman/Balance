import { ReadlineParser, SerialPort } from "serialport";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"
import fs from "fs";

type Score = {
  timestamp: number;
  personal: number;
  professional: number;
  spiritual: number;
}

const port = new SerialPort({
  path: "/dev/ttyACM0",
  baudRate: 9600
});

let timer: NodeJS.Timeout | null = null;
let personal: number = 0;
let professional: number = 0;
let spiritual: number = 0;

const credentials = JSON.parse(fs.readFileSync("../credentials.json", "utf-8"));
const app = initializeApp({credential: cert(credentials)});
const db = getFirestore(app);

const currentDoc = db.doc("current/current");
const historicCollection = db.collection("/historic");

async function toFirestore() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const data: Score = { personal, professional, spiritual, timestamp };
  
  await Promise.all([
    currentDoc.update(data),
    historicCollection.add(data)
  ]);
  console.log(`Updated ${personal}${professional}${spiritual}`);
}

const lineStream = port.pipe(new ReadlineParser());
lineStream.on("data", (data: string) => {
  const newPersonal = parseInt(data[0]);
  const newProfessional = parseInt(data[1]);
  const newSpiritual = parseInt(data[2]);

  if (timer !== null) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    timer = null;
    if (
      personal !== newPersonal ||
      professional !== newProfessional ||
      spiritual !== newSpiritual
    ) {
      personal = newPersonal;
      professional = newProfessional;
      spiritual = newSpiritual;
      toFirestore();
    }
  }, 1_000);
});

function toBalanceBox() {
  const data = `${personal}${professional}${spiritual}`;
  console.log(`From Remote: ${data}`);
  port.write(`${data}\n`, "ascii");
}

currentDoc.onSnapshot(snapshot => {
  const data = snapshot.data() as Score;
  personal = data.personal;
  professional = data.professional;
  spiritual = data.spiritual;
  toBalanceBox();
});
