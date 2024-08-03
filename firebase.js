// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWED-L_xTM_9MCVd2yD7SUFJY4_PzdkY4",
  authDomain: "pantry-tracker-11c3d.firebaseapp.com",
  projectId: "pantry-tracker-11c3d",
  storageBucket: "pantry-tracker-11c3d.appspot.com",
  messagingSenderId: "807673357280",
  appId: "1:807673357280:web:509e79145c8ddb1d8c0185",
  measurementId: "G-4ZD6BRWG23",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);

export { fireStore };
