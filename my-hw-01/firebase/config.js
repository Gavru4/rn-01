import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDliP88jo1590cVQmfIsq6Qw9R428eJ5K0",
  authDomain: "react-native-app-3f7e7.firebaseapp.com",
  projectId: "react-native-app-3f7e7",
  storageBucket: "react-native-app-3f7e7.appspot.com",
  messagingSenderId: "152772692100",
  appId: "1:152772692100:web:dc78d2d07f1efaf9db1ad1",
  measurementId: "G-ET0NC2GKS6",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);

// const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const firebaseAuth = firebase.auth();

export { firestore, storage, firebaseAuth };
