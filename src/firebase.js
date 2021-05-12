import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBPiWZaujneQlRTeX2V9dQrDIVpUqqzn5c",
  authDomain: "ecom-app-nikfs.firebaseapp.com",
  projectId: "ecom-app-nikfs",
  storageBucket: "ecom-app-nikfs.appspot.com",
  messagingSenderId: "452869072984",
  appId: "1:452869072984:web:00f3bee783236d55c9822d",
};
// Initialize Firebase
var db = firebase.initializeApp(firebaseConfig).firestore();
let storage = firebase.storage();
export { storage, db as default };
