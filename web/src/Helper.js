import { storage } from './firebase';

export const uploadFBImage = (file, id, setProgress, setError, callback) => {
  const uploadTask = storage.ref(`/Profiles/${id}/${file.name}`).put(file);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = Math.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100);
      console.log('Progress', progress);
      setProgress(progress);
    },
    (error) => setError(error),
    () => storage.ref(`Profiles/${id}`).child(file.name).getDownloadURL().then((url) => callback(url))
  );
};
