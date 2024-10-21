import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAgX7lzijausRvDoaW6kZ84XJmwc76m82Q",
    authDomain: "postpage-db0d9.firebaseapp.com",
    projectId: "postpage-db0d9",
    storageBucket: "postpage-db0d9.appspot.com",
    messagingSenderId: "721217709377",
    appId: "1:721217709377:web:44dedfa2821fd60108edc0",
    measurementId: "G-4GFF9HLNMB"
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
