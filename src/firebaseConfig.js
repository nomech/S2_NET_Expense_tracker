// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4XgQq6jlnnTSNFrHwMqCtyxoqkKJKgnI",
  authDomain: "s2-expense-tracker.firebaseapp.com",
  projectId: "s2-expense-tracker",
  storageBucket: "s2-expense-tracker.firebasestorage.app",
  messagingSenderId: "192712614074",
  appId: "1:192712614074:web:20090fc1827dcf87a32283",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
