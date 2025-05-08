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

export { app, auth, db };  // Export app, auth, and db
