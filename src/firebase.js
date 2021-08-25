import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/firebase-analytics';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_F_APIKEY,
  authDomain: 'sridhar-nallasamy.firebaseapp.com',
  databaseURL: 'https://sridhar-nallasamy.firebaseio.com',
  projectId: 'sridhar-nallasamy',
  storageBucket: 'sridhar-nallasamy.appspot.com',
  messagingSenderId: process.env.REACT_APP_F_MSID,
  appId: process.env.REACT_APP_F_APPID,
  measurementId: process.env.REACT_APP_F_MID,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const ga = firebase.analytics();
const storage = firebase.storage();
const collectionName = 'PROD_v03';
const fieldValue = firebase.firestore.FieldValue;
export {db, storage, ga, collectionName, fieldValue};
