const firebase = require("firebase");
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC0OONafBrWfduA3CVRCeBMMNsFygHFCkM",
  authDomain: "todolist-firestore-bb059.firebaseapp.com",
  databaseURL: "https://todolist-firestore-bb059.firebaseio.com",
  projectId: "todolist-firestore-bb059",
  storageBucket: "todolist-firestore-bb059.appspot.com",
  messagingSenderId: "900921525661",
  appId: "1:900921525661:web:92387598e05ea6911fdb74",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default {
  firestore: firebase.firestore(),
};