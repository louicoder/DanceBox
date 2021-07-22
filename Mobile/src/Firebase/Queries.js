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
    callback({ error: error.code, doc: undefined });
  }
};

export const createUserAccount = async ({ email, password, ...payload }, callback) =>
  await AUTH.createUserWithEmailAndPassword(email, password)
    .then(async (doc) => await createDocWithId('Users', doc.user.uid, { ...payload, email }, callback))
    .catch((error) => callback({ error: error.message }));

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
    .then(async (resp) => {
      // console.log('REsp from update', resp);
      await DB.doc(`${collection}/${docId}`)
        .get()
        .then((snapshot) => callback({ error: undefined, doc: snapshot.data() }));
    })
    .catch((error) => callback({ error, doc: undefined }));
};
