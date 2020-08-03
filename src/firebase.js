import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCiQj8-fy4V4S71Wi9y27LDlFXhFcVeLj8',
  authDomain: 'sridhar-nallasamy.firebaseapp.com',
  databaseURL: 'https://sridhar-nallasamy.firebaseio.com',
  projectId: 'sridhar-nallasamy',
  storageBucket: 'sridhar-nallasamy.appspot.com',
  messagingSenderId: '946843617708',
  appId: '1:946843617708:web:d21378989b53bc24409209',
  measurementId: 'G-MZX956QRGX',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

export const analytics = firebase.analytics();

// export default analytics;
