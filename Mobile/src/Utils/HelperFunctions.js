import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, check } from 'react-native-permissions';
import Storage from '@react-native-firebase/storage';

// const Storage = storage();
export const keyGenerator = () => Math.random().toString(36).slice(2);

export const CheckPermissions = async (permission, callback) => {
  await check(permission)
    .then(async (result) => {
      switchPermissionResult(result, permission, callback);
    })
    .catch((error) => {
      // console.log('erro in permissions', error.message);
      return { error };
    });
};

export const requestPermission = async (permission, callback) => {
  try {
    await request(permission).then((result) => {
      // console.log('PERMISSION', permission);
      if (result === 'granted') return callback({ error: null });
      return callback({ error: result });
    });
  } catch (error) {
    return { error };
  }
};

const switchPermissionResult = (result, permission, callback) => {
  try {
    switch (result) {
      case 'unavailable':
        // console.log('This feature is not available (on this device / in this context)');
        return requestPermission(permission, callback);
      case 'denied':
        // console.log('The permission has not been requested / is denied but requestable');
        return requestPermission(permission, callback);
      case 'limited':
        return requestPermission(permission, callback);
      case 'granted':
        // console.log('The permission is granted');
        // return { error: null, granted: true };
        return callback();
      case 'blocked':
        // console.log('The permission is denied and not requestable anymore');
        break;
    }
  } catch (error) {
    return { error };
  }
};

export const ImagePicker = (callback, opts = {}) => {
  const options = {
    title: 'Select Photo',
    // customButtons: [ { name: 'fb', title: 'Choose Photo from Gallery' } ],
    storageOptions: {
      skipBackup: true
      // path: 'images'
    },
    ...opts
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      // console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      // console.log('User tapped custom button: ', response.customButton);
    } else {
      // console.log('Responsefile size mbs -->', response.fileSize, 'filanme -->', response.fileName);
      callback(response);
    }
  });
};

export const uploadImage = async (storagePath, imagePath, setProgress, setError, callback) => {
  const storageRef = Storage().ref();
  const uploadTask = storageRef.child(storagePath).putFile(imagePath);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // console.log('Progress ------', snapshot.bytesTransferred / snapshot.totalBytes * 100);
      setProgress(Math.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100));
    },
    (error) => setError(error),
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        callback(downloadURL);
      });
    }
  );
};

export const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const Notify = (title = 'Information', message) => Alert.alert(title, message);
