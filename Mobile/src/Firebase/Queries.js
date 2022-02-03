import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const DB = firestore();
const AUTH = auth();

export const signIn = async (email, password, callback) => {
  try {
    const account = await AUTH.signInWithEmailAndPassword(email, password);
    if (account.user) {
      callback({ success: true, uid: account.user.uid });
    }
  } catch (error) {
    callback({ success: false, doc: error.message });
  }
};

export const createUserAccount = async ({ email, password, ...payload }, callback) =>
  await AUTH.createUserWithEmailAndPassword(email, password)
    .then((doc) => callback({ success: true, result: doc.user }))
    .catch((error) => callback({ success: false, result: error.message }));

export const getDoc = async (collection, doc, callback) => {
  try {
    await DB.collection(collection)
      .doc(doc)
      .get()
      .then((snapshot) => callback({ doc: snapshot.data(), error: undefined }));
  } catch (error) {
    return callback({ error: error.message, doc: undefined });
  }
};

export const getDocRealTime = (collection, doc, callback) => {
  try {
    DB.collection(collection).doc(doc).onSnapshot((snapshot) => callback({ doc: snapshot.data(), error: undefined }));
  } catch (error) {
    return callback({ error: error.message, doc: undefined });
  }
};

export const getDocuments = async (collection, callback) => {
  try {
    await DB.collection(collection).get().then((snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // callback({ doc: [ ...snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) ], error: undefined })
      return callback({ doc: docs, error: undefined });
    });
  } catch (error) {
    return callback({ error: error.message, doc: undefined });
  }
};

export const createDocWithId = async (collection, docId, payload, callback) => {
  try {
    await DB.collection(collection).doc(docId).set(payload).then((doc) => callback({ error: undefined, doc: docId }));
  } catch (error) {
    return callback({ error: error.message, doc: undefined });
  }
};

export const createDoc = async (collection, payload, callback) => {
  try {
    await DB.collection(collection).add(payload).then((doc) => callback({ error: undefined, doc: doc.id }));
  } catch (error) {
    return callback({ error: error.message, doc: undefined });
  }
};

export const updateDoc = async (collection, docId, payload, callback) => {
  await DB.doc(`${collection}/${docId}`)
    .set(payload, { merge: true })
    .then(
      async () =>
        await DB.doc(`${collection}/${docId}`)
          .get()
          .then((snapshot) => callback({ success: true, result: snapshot.data() }))
    )
    .catch((error) => callback({ success: false, result: error.message }));
};

// This function returns all documents that exist in the passed array.
export const getMultipleDocuments = async (field, collection, docsArray) => {
  const splitArray = getArraychunks(docsArray, 10);
  try {
    let results = [];
    for (const docs of splitArray) {
      const response = await DB.collection(collection).where(field, 'in', docs).get();
      if (response._docs) {
        const result = [ ...response._docs.map((doc) => ({ ...doc.data(), id: doc.id })) ];
        results = [ ...results, ...result ];
      }
    }
    return results;
  } catch (error) {
    return Alert.alert('Error', error.message);
  }
};

// Splits array of n-size into size of 10 since its the limit for firestore in operator in the above function
const getArraychunks = (array, size) => {
  var results = [];
  while (array.length) {
    results.push(array.splice(0, size));
  }
  return results;
};
