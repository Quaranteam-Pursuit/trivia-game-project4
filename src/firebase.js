// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHHuvMSJpRNAvrQUtmpHADVPLlkCaaZxI",
  authDomain: "trivia-game-5eb73.firebaseapp.com",
  projectId: "trivia-game-5eb73",
  storageBucket: "trivia-game-5eb73.appspot.com",
  messagingSenderId: "565250200229",
  appId: "1:565250200229:web:3bbcd7f3cf4e3ef19b734c"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
