const admin = require('firebase-admin');
require('dotenv').config();

// import firebase from 'firebase-admin';
var serviceAccount = require('../dance-box-2022-firebase-adminsdk-ghdm1-206e97b937');

const FIREBASE = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

module.exports = FIREBASE.firestore();
