
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage' ;
import { getAuth } from 'firebase/auth' ;
import { getFirestore } from 'firebase/firestore' ;
import { getDatabase } from 'firebase/database' ;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: "https://solstice-d447d-default-rtdb.firebaseio.com",
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const storage = getStorage(firebaseApp) ;
const auth = getAuth(firebaseApp) ;
auth.languageCode = 'it';
const db = getFirestore(firebaseApp) ;
const realDb = getDatabase(firebaseApp) ;

export {auth, firebaseApp , storage, db, realDb} ;