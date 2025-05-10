import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
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
  appId: "1:1016272171887:web:39ea44daf5afa8fab5ae9a",
  measurementId: "G-0RWZVXP7P9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };