// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-789ce.firebaseapp.com",
  projectId: "mern-estate-789ce",
  storageBucket: "mern-estate-789ce.appspot.com",
  messagingSenderId: "815475763342",
  appId: "1:815475763342:web:ca77d2a4520e1d1c7dc1df"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);