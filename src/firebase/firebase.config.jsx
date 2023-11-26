// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkY0nLNKkcXEUw4Dhnj8JCFuW19dYmKUw",
  authDomain: "ema-john-shopping-65f32.firebaseapp.com",
  projectId: "ema-john-shopping-65f32",
  storageBucket: "ema-john-shopping-65f32.appspot.com",
  messagingSenderId: "296273383546",
  appId: "1:296273383546:web:d20a1265f2eaede083abc3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
