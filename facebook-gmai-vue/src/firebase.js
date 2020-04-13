const firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");
//manejar imagenes o archivos
require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyCEjkq-9LfYTPgHh3CQxtDuXjYSSUTk3Bs",
    authDomain: "face-fd5b7.firebaseapp.com",
    databaseURL: "https://face-fd5b7.firebaseio.com",
    projectId: "face-fd5b7",
    storageBucket: "face-fd5b7.appspot.com",
    messagingSenderId: "246222612726",
    appId: "1:246222612726:web:8251abe03ede04d95264d7"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firebase, db, auth, storage} 