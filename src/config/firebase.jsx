// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEwe-Q4wCtNz-FGQSU1Xw7QF4sb2lurZw",
  authDomain: "premseva-46c23.firebaseapp.com",
  projectId: "premseva-46c23",
  storageBucket: "premseva-46c23.appspot.com",
  messagingSenderId: "255870928520",
  appId: "1:255870928520:web:07f0d3dbb4aa3855dc413d",
  measurementId: "G-16EH9S9V3Z",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
