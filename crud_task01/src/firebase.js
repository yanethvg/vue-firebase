import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNbvYTCYct7B_722XB4scNCCvCAt1pZyE",
    authDomain: "crud-task01-vue.firebaseapp.com",
    databaseURL: "https://crud-task01-vue.firebaseio.com",
    projectId: "crud-task01-vue",
    storageBucket: "crud-task01-vue.appspot.com",
    messagingSenderId: "97313178049",
    appId: "1:97313178049:web:51a18d7d01579592762f40",
    measurementId: "G-1YGCXQLXHW"
  };
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

//firebaseApp.firestore().settings({timestampsInSnapshots: true});

export default firebaseApp.firestore();