import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArb0l551sYRnEDBz1gMF5kPxiZ2BXb1_o",
  authDomain: "afromeet-85c92.firebaseapp.com",
  projectId: "afromeet-85c92",
  storageBucket: "afromeet-85c92.appspot.com",
  messagingSenderId: "179506998587",
  appId: "1:179506998587:web:65d87f7dc829895d455b1e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
