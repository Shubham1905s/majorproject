// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// export const db = getFirestore(app);
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0raP7V1zg0cQgjG_duT3u5p0GoFc-4Dk",
    authDomain: "majorproject-680c7.firebaseapp.com",
    projectId: "majorproject-680c7",
    storageBucket: "majorproject-680c7.firebasestorage.app",
    messagingSenderId: "67762402522",
    appId: "1:67762402522:web:4a506163070d3e11b721e3",
    measurementId: "G-7GG8TBDNV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);