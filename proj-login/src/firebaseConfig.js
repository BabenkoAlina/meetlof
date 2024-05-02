// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import getAuth for Firebase Authentication


const firebaseConfig = {
  apiKey: "AIzaSyDyG-noFnQTK7DHpowdZukS-bL9u7AmbI4",
  authDomain: "meetlof-3c3f0.firebaseapp.com",
  projectId: "meetlof-3c3f0",
  storageBucket: "meetlof-3c3f0.appspot.com",
  messagingSenderId: "398475536841",
  appId: "1:398475536841:web:34dbe1b4715ca6ec6fe018",
  measurementId: "G-FGVNRD5P4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize auth instance

export { db, auth }; // Export db and auth