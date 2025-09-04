// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYUxciA65WMUKKF6C1K2L4W9f3NamKpag",
  authDomain: "tripmate-76556.firebaseapp.com",
  projectId: "tripmate-76556",
  storageBucket: "tripmate-76556.firebasestorage.app",
  messagingSenderId: "416231103050",
  appId: "1:416231103050:web:6d1675d5ee5c283a2be4b3",
  measurementId: "G-C1FK0H1SYP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
