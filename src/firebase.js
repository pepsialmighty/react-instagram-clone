import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAkPHkPqrjs0-bfIrTYVx-YIc2TX0WWiHk",
  authDomain: "instagram-clone-react-68abe.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-68abe.firebaseio.com",
  projectId: "instagram-clone-react-68abe",
  storageBucket: "instagram-clone-react-68abe.appspot.com",
  messagingSenderId: "390823179787",
  appId: "1:390823179787:web:bc23fc8a584ad16ec4f90e",
  measurementId: "G-21WGM5RG48",
});

//db of firebase
const db = firebaseApp.firestore();
//auth of firebase
const auth = firebase.auth();
//upload things
const storage = firebase.storage();

export { db, auth, storage };
