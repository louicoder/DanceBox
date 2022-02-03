const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const { email, uid, displayName: name = '', photoURL = '', emailVerified, phoneNumber = '' } = user;
  return admin
    .firestore()
    .collection('users')
    .doc(`${uid}`)
    .set({ email, uid, name, photoURL, emailVerified, phoneNumber, following: [], followers: [] });
});
