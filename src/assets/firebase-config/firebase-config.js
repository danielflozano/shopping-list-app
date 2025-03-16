// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5hAsg8-p61gHs1x6UKLLwN44LN3fm23A",
  authDomain: "shopping-list-15056.firebaseapp.com",
  projectId: "shopping-list-15056",
  storageBucket: "shopping-list-15056.firebasestorage.app",
  messagingSenderId: "376580714205",
  appId: "1:376580714205:web:3f1a8c58877ca83e8af534",
  measurementId: "G-GGV734QCQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();
export { auth, db };


