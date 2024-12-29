import express from "express";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, terminate } from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config({ path: ["../.env"] });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = express();
app.listen(3000, () => {
  console.log(">> Admin server running on port 3000");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyparser.json());
app.use(cookieParser());

app.post("/city", async (req, res) => {
  console.log(">> Received city post request", req.body);
  try {
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    let collectionPrefix = "DUMMY_";
    if (process.env.FIRESTORE_DEV_MODE == "false") {
      collectionPrefix = "";
    }
    const collectionName = `${collectionPrefix}cities`;
    const countryCollection = collection(db, collectionName);
    const documentData = req.body;
    console.log(`>> Adding document to collection ${collectionName}`);
    const newDocRef = await addDoc(countryCollection, documentData);
    console.log(">> Document added with id", newDocRef.id);
    terminate(db);
    res.status(200).send({ id: newDocRef.id });
  } catch (error) {
    console.error(">> Error adding document", error);
    terminate(db);
    res.status(500).send({ error: "Error adding document" });
  }
});

app.post("/country", async (req, res) => {
  console.log(">> Received country post request", req.body);
  try {
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    let collectionPrefix = "DUMMY_";
    if (process.env.FIRESTORE_DEV_MODE == "false") {
      collectionPrefix = "";
    }
    const collectionName = `${collectionPrefix}countries`;
    const countryCollection = collection(db, collectionName);
    const documentData = req.body;
    console.log(`>> Adding document to collection ${collectionName}`);
    const newDocRef = await addDoc(countryCollection, documentData);
    console.log(">> Document added with id", newDocRef.id);
    terminate(db);
    res.status(200).send({ id: newDocRef.id });
  } catch (error) {
    console.error(">> Error adding document", error);
    terminate(db);
    res.status(500).send({ error: "Error adding document" });
  }
});
