// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEVnGptuzXHeenqlQsj3DpZwCiy3oQaH8",
  authDomain: "e-commerce-a56b5.firebaseapp.com",
  projectId: "e-commerce-a56b5",
  storageBucket: "e-commerce-a56b5.appspot.com",
  messagingSenderId: "564361901406",
  appId: "1:564361901406:web:0ce2b24329659bbaae4bcf",
  measurementId: "G-LWSCXZ7S63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
