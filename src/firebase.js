import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDxsOHFVtCZDIIKXysZc_05Y_AEETL_2og",
  authDomain: "plumovi-47a65.firebaseapp.com",
  databaseURL: "https://plumovi-47a65.firebaseio.com",
  projectId: "plumovi-47a65",
  storageBucket: "plumovi-47a65.appspot.com",
  messagingSenderId: "802932594243",
  appId: "1:802932594243:web:87453f5c28def5fe9066f6",
  measurementId: "G-917NJPZ87J"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;