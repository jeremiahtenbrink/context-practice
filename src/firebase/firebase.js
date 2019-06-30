// Firebase App (the core Firebase SDK) is always required and must be listed
// first
import * as firebase from "firebase";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};
// Initialize Firebase
firebase.initializeApp( firebaseConfig );

export const store = firebase.firestore();

export default firebase;