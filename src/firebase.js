// Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore module

// Your Firebase configuration (ensure it's correct and not shared publicly in production)
const firebaseConfig = {
  apiKey: "AIzaSyAm7B_bdMezQ-rqFjScE593hGGCVBa7VZ0",
  authDomain: "curriculum-statistics.firebaseapp.com",
  projectId: "curriculum-statistics",
  storageBucket: "curriculum-statistics.appspot.com",
  messagingSenderId: "51782680110",
  appId: "1:51782680110:web:6bc2a46eb9f791892a29bf"
};

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);

// Get Firebase Auth and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

// Set Firebase Auth persistence to local only once
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistence set to local');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

// Export necessary methods and instances
export { app, auth, db, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged };
