import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD88RIQhu68BdxJ6f9OCyu7vtXuVf7bg2Q",
    authDomain: "eazy-chat-b5c7a.firebaseapp.com",
    projectId: "eazy-chat-b5c7a",
    storageBucket: "eazy-chat-b5c7a.appspot.com",
    messagingSenderId: "71367713415",
    appId: "1:71367713415:web:e9fcc142ad1656474d4e22",
    measurementId: "G-HPP65PSE7Q"
};

firebase.initializeApp(firebaseConfig);




export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const emailAuthProvider = firebase.auth.EmailAuthProvider;