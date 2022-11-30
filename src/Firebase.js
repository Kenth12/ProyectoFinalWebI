// Import the functions you need from the SDKs you need
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvDGPomZHnKZMkU0CtBEU1Y2KnKEqXsTs",
  authDomain: "proyectfirebase-e2ac9.firebaseapp.com",
  projectId: "proyectfirebase-e2ac9",
  storageBucket: "proyectfirebase-e2ac9.appspot.com",
  messagingSenderId: "710629986379",
  appId: "1:710629986379:web:cf04711e798a5c989cfdce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export{db};