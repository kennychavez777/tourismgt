// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCEN9Gbz7F3ansynuAJ1SwEd6W-TxBSb94",
  authDomain: "tourism-gt.firebaseapp.com",
  projectId: "tourism-gt",
  storageBucket: "tourism-gt.appspot.com",
  messagingSenderId: "140519977626",
  appId: "1:140519977626:web:1f24a18fa154ba6c5ca523"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE = getFirestore(FIREBASE_APP);