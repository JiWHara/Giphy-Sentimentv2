// Firebase:
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqb7S0OPBqyeW9xGgRPJC8euGvWdFkjLk",
    authDomain: "giphy-sentiment-23c07.firebaseapp.com",
    projectId: "giphy-sentiment-23c07",
    storageBucket: "giphy-sentiment-23c07.appspot.com",
    messagingSenderId: "876116945805",
    appId: "1:876116945805:web:b2445fc0ce138f84fb6bc4"
};

// Initialize Firebase
const firebaseInfo = initializeApp(firebaseConfig);

export default firebase;