// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7M8LccZsCIq7Rr3NZw19J_EEANAJP_lA",
    authDomain: "meetlof-90717.firebaseapp.com",
    projectId: "meetlof-90717",
    storageBucket: "meetlof-90717.appspot.com",
    messagingSenderId: "207041903006",
    appId: "1:207041903006:web:2bcc9b3a92636767ccfe8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);