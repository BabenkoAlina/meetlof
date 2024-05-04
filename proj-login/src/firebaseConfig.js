// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsb4jm2iurRS-9hVQ2Td3tKCBv_pblaHA",
  authDomain: "meetlof-b2faa.firebaseapp.com",
  projectId: "meetlof-b2faa",
  storageBucket: "meetlof-b2faa.appspot.com",
  messagingSenderId: "366345120330",
  appId: "1:366345120330:web:ff1e02d3e46d07031454b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);