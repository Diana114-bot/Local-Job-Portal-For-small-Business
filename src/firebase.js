<<<<<<< HEAD
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase



// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcbXFYyoAM5XUgBWBTeHmy8y08dqEBvgc",
  authDomain: "spaza-42a31.firebaseapp.com",
  projectId: "spaza-42a31",
  storageBucket: "spaza-42a31.firebasestorage.app",
  messagingSenderId: "1016272171887",
  appId: "1:1016272171887:web:4e56bea9bfe0b29cb5ae9a",
  measurementId: "G-SJCL332WZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

=======
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBexR5IKfP3xTPcNDkA72Y1Zf0dknU05ZQ",
  authDomain: "localzoneauthentication.firebaseapp.com",
  projectId: "localzoneauthentication",
  appId: "1:323084359792:web:14efaee888aa8409b2fcb5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
>>>>>>> 7db86fd615d0191eef0beadb93485f85987fea69
