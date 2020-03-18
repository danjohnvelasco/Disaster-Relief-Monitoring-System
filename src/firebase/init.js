import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyBvAjQ2HdtxatVL6lWxhe6JI9SaQlfc6OM",
  authDomain: "sample-lsdr.firebaseapp.com",
  databaseURL: "https://sample-lsdr.firebaseio.com",
  projectId: "sample-lsdr",
  storageBucket: "sample-lsdr.appspot.com",
  messagingSenderId: "177791907748",
  appId: "1:177791907748:web:7402a51a225e0b56e83331",
  measurementId: "G-F4S1ZD360Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// export firestore db
export default db;