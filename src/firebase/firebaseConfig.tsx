// Firebase App (the core Firebase SDK) is always required and must be listed
// first
import * as firebase from "firebase";
// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3kk-othOB2cW98U-v2RfwWjSbrrBaTZ4",
  authDomain: "grit-n-grind.firebaseapp.com",
  databaseURL: "https://grit-n-grind.firebaseio.com",
  projectId: "grit-n-grind",
  storageBucket: "grit-n-grind.appspot.com",
  messagingSenderId: "521026752128",
  appId: "1:521026752128:web:41ca8ccf0367dadf",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const store = firebase.firestore();

export default firebase;
