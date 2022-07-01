import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApnrEG-wXlgmn5VKVyRKwiQR9q7QuqkEY",
  authDomain: "sociale-ec927.firebaseapp.com",
  projectId: "sociale-ec927",
  storageBucket: "sociale-ec927.appspot.com",
  messagingSenderId: "535348370943",
  appId: "1:535348370943:web:165d21fcbe32e042d51bca",
  measurementId: "G-J4ZSR874D9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
