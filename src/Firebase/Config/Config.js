// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkzzxEkhrE1boWJmfEZb04f_w_vKMmaNU",
  authDomain: "chema-4d95b.firebaseapp.com",
  projectId: "chema-4d95b",
  storageBucket: "chema-4d95b.appspot.com",
  messagingSenderId: "1022164285508",
  appId: "1:1022164285508:web:005fd2a65267ff203ca411",
  measurementId: "G-J84LPB7ZQG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
