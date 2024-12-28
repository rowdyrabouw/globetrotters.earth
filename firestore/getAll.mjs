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
const querySnapshot = await getDocs(collection(db, "countries"));

console.log(`>> Writing ${querySnapshot.size} countries to json file`);
const countries = [];
querySnapshot.forEach((doc) => {
  const country = { id: doc.id, ...doc.data() };
  countries.push(country);
});
await writeFile(`src/_data/countries.json`, JSON.stringify(countries), (err) => {
  if (err) throw err;
});

console.log(`>> Writing ${countries.length} countries to javascript file`);
const countriesJsObject = countries.reduce((acc, country) => {
  acc[country.placeId] = parseInt(country.visitedBy);
  return acc;
}, {});
await writeFile(`src/assets/js/countries.js`, "export const countries =" + JSON.stringify(countriesJsObject) + ";", (err) => {
  if (err) throw err;
});

terminate(db);
