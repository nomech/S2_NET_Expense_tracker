import { initializeApp } from "firebase/app";

/* const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}; */

const firebaseConfig = {
  apiKey: "AIzaSyC4XgQq6jlnnTSNFrHwMqCtyxoqkKJKgnI",
  authDomain: "s2-expense-tracker.firebaseapp.com",
  projectId: "s2-expense-tracker",
  storageBucket: "s2-expense-tracker.firebasestorage.app",
  messagingSenderId: "192712614074",
  appId: "1:192712614074:web:20090fc1827dcf87a32283",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
