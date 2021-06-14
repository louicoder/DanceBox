import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyApI3-wQ1fs3d6eq3e_kqNP8ZCLrdI3huI',
  authDomain: 'dancebox-309908.firebaseapp.com',
  projectId: 'dancebox-309908',
  storageBucket: 'dancebox-309908.appspot.com',
  databaseURL: 'https://dancebox-309908.firebaseio.com ',
  messagingSenderId: '164111047123',
  appId: '1:164111047123:web:b18afece3bc0efb823f726',
  measurementId: 'G-4VK9PFJ3JV'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral
// firebase.analytics();

const storage = firebase.storage();
const firestore = firebase.firestore();
const auth = firebase.auth();

export { storage, firestore, auth, firebase as default };
