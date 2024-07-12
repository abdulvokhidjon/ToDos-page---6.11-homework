import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAEGHd6PCYQho16sLE1-EktQlE7hrYRqM",
  authDomain: "august-beaker-427516-i0.firebaseapp.com",
  projectId: "august-beaker-427516-i0",
  storageBucket: "august-beaker-427516-i0.appspot.com",
  messagingSenderId: "829243022431",
  appId: "1:829243022431:web:d501231147d1b2e2670fea",
  measurementId: "G-10JV7GRWJK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);

//data base
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
