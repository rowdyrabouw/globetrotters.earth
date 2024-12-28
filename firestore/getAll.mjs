import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, terminate } from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config();

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

const querySnapshot = await getDocs(collection(db, "countries"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
});
console.log("Countries:", querySnapshot.size);

terminate(db);
