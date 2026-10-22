// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// This configuration is safe and any client(user) can see it, certified by firebase so dont get shady thoughts of stealing api key 
const firebaseConfig = {
  apiKey: "AIzaSyB8l8Bkv1Z_Wc9lWBatJJXKOUlIICx8WVM",
  authDomain: "movie-library-80212.firebaseapp.com",
  projectId: "movie-library-80212",
  storageBucket: "movie-library-80212.firebasestorage.app",
  messagingSenderId: "261596919718",
  appId: "1:261596919718:web:41edc58b91e2a6b32a8167",
  measurementId: "G-89MJME52TP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)