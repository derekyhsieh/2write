// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA4kmbCFgCJ130gNjTmK2Le5lPHqVX1pJ4",
  authDomain: "write-dev.firebaseapp.com",
  projectId: "write-dev",
  storageBucket: "write-dev.appspot.com",
  messagingSenderId: "972560962982",
  appId: "1:972560962982:web:ab500c8a2b2ce8f5fc6b67",
  measurementId: "G-8GS9V62LDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const analytics = getAnalytics(app);
export const auth = getAuth(app)