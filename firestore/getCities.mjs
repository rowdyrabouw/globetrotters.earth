import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, terminate } from "firebase/firestore";
import { promisify } from "util";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log(">> Fetching data from Firestore");
const querySnapshot = await getDocs(collection(db, "cities"));

console.log(`>> Writing ${querySnapshot.size} cities to json file`);
const cities = [];
querySnapshot.forEach((doc) => {
  const city = { id: doc.id, ...doc.data() };
  cities.push(city);
});
await writeFile(`src/_data/cities.json`, JSON.stringify(cities), (err) => {
  if (err) throw err;
});

console.log(`>> Writing ${cities.length} cities to javascript file`);
await writeFile(`src/assets/js/cities.js`, "export const cities =" + JSON.stringify(cities) + ";", (err) => {
  if (err) throw err;
});

terminate(db);
