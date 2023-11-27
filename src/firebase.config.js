// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIUMTQp1yEXLVe83gqimpIKvFKsp7FoC0",
  authDomain: "stage-lizard.firebaseapp.com",
  projectId: "stage-lizard",
  storageBucket: "stage-lizard.appspot.com",
  messagingSenderId: "907149111407",
  appId: "1:907149111407:web:17de830c630a88977d1d9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
