// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIWMtCxP5FSidYBHQKSyeoPSWWApT8XY8",
  authDomain: "wiki-is-you.firebaseapp.com",
  projectId: "wiki-is-you",
  storageBucket: "wiki-is-you.appspot.com",
  messagingSenderId: "43629982729",
  appId: "1:43629982729:web:4a9ccdde7576529fa834d8",
  measurementId: "G-HWPJRB9QRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore()