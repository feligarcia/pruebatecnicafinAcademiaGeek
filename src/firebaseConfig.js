
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCutNZxPzx83MUmRPiZJIzj86JDyr6RDbU",
  authDomain: "autenticacionf7.firebaseapp.com",
  projectId: "autenticacionf7",
  storageBucket: "autenticacionf7.appspot.com",
  messagingSenderId: "294060789064",
  appId: "1:294060789064:web:4d3fbe7ee6317aaa2d377d"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore()
const google = new GoogleAuthProvider()
const facebook = new FacebookAuthProvider()

export {
    app,
    google,
    db,
    facebook
}