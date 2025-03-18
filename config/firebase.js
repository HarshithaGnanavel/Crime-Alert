// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj_51WkCCvZJwSKnxUPV0XzBzMK3AMap0",
  authDomain: "crime-alert-demo-b576b.firebaseapp.com",
  projectId: "crime-alert-demo-b576b",
  storageBucket: "crime-alert-demo-b576b.firebasestorage.app",
  messagingSenderId: "416152592885",
  appId: "1:416152592885:web:f177ab22c278491fc740bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };