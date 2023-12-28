// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJfvAPS-ro7jVWyIZXps4x9X99mpbIKUs",
    authDomain: "wpotpsolution.firebaseapp.com",
    projectId: "wpotpsolution",
    storageBucket: "wpotpsolution.appspot.com",
    messagingSenderId: "516302542443",
    appId: "1:516302542443:web:6a77e0df88aa0e6004032e"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);

export const auth = getAuth(firebase_app);