// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIkP60r1t9RC0cMxlIXTUmP2OJg21pX58",
  authDomain: "gym-map-a76eb.firebaseapp.com",
  projectId: "gym-map-a76eb",
  storageBucket: "gym-map-a76eb.appspot.com",
  messagingSenderId: "592494438193",
  appId: "1:592494438193:web:9e8d345a9d731d02aaf210",
  measurementId: "G-LCQX5WKC5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };
