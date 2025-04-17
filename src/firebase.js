// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBexR5IKfP3xTPcNDkA72Y1Zf0dknU05ZQ",
  authDomain: "localzoneauthentication.firebaseapp.com",
  projectId: "localzoneauthentication",
  
  appId: "1:323084359792:web:14efaee888aa8409b2fcb5",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };