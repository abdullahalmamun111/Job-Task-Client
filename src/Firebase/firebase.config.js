// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnC_QqrEA840mnKDOZhDRAkU5jwKzcv_s",
  authDomain: "job-task-48528.firebaseapp.com",
  projectId: "job-task-48528",
  storageBucket: "job-task-48528.firebasestorage.app",
  messagingSenderId: "590306180980",
  appId: "1:590306180980:web:3d04621250ea83bbb47621",
  measurementId: "G-9MW907B6YW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);