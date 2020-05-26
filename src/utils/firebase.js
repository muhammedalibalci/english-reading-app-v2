import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


const config = {
  apiKey: "AIzaSyCYU_sYWAoW-RVGP4u2FqF3F4vysUkQgZY",
  authDomain: "readingv2.firebaseapp.com",
  databaseURL: "https://readingv2.firebaseio.com",
  projectId: "readingv2",
  storageBucket: "readingv2.appspot.com",
  messagingSenderId: "729756845680",
  appId: "1:729756845680:web:2a1642b9bd3740a81256b5",
};

firebase.initializeApp(config);


export default firebase;