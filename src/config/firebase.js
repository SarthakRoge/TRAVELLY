import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDVJx2u3bJKos13aCz8OfgTrDEWpxiWQ94",
  authDomain: "travel1-51bf7.firebaseapp.com",
  projectId: "travel1-51bf7",
  storageBucket: "travel1-51bf7.appspot.com",
  messagingSenderId: "99334767898",
  appId: "1:99334767898:web:b4000bea08e9426b8698a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with specific settings
export const auth = getAuth(app);
export const db=getFirestore(app);
