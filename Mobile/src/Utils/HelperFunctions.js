import { Alert, Linking, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, check, PERMISSIONS } from 'react-native-permissions';
import Storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

// const Storage = storage();
export const keyGenerator = () => Math.random().toString(36).slice(2);

export const CheckPermissions = async (permission, callback) => {
  await check(permission)
    .then(async (result) => {
      // console.log('Permisision result', result);
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
    return callback({ error: error.message });
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

export const ImagePicker = (callback, opts = { maxWidth: 500, maxHeight: 500 }) => {
  const options = {
    title: 'Select Photo',
    includeBase64: true,
    // quality: 0.5,
    // customButtons: [ { name: 'fb', title: 'Choose Photo from Gallery' } ],
    storageOptions: {
      skipBackup: true
      // path: 'images'
    },
    // we resize image here in the opts above
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

export const CHECK_GALLERY_PERMISSIONS = async (callback) => {
  try {
    await check(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY
      })
    ).then(
      async (res) =>
        res === 'granted'
          ? callback({ success: true, result: res })
          : await request(
              Platform.select({
                android: PERMISSIONS.ANDROID.CAMERA,
                ios: PERMISSIONS.IOS.PHOTO_LIBRARY
              })
            ).then((resp) => callback({ success: resp === 'granted' ? true : false, resp }))
    );
  } catch (error) {
    return callback({ success: false, error: error.message });
  }
};

export const getRandomArrayItems = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export const openLink = (url) => {
  if (!url) return Alert.alert('Error opening link', 'The passed link is empty and therfore cannot be opened');
  try {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  } catch (error) {
    return Alert.alert('Error opening link', "Don't know how to open URI: " + error.message);
  }
};

export const getAsyncObjectData = async (key, callback) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return callback({ success: true, result: JSON.parse(jsonValue) });
  } catch (error) {
    // console.log('ERROR get storage', e);
    return callback({ success: false, result: error.message });
  }
};

export const storeAsyncObjectData = async (key, value, callback) => {
  try {
    if (typeof key !== 'string') return callback({ error: 'Unsupported data type, Only string allowed' });
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue).then(() => callback({ success: true, result: 'Success' }));
  } catch (e) {
    callback({ success: false, result: e.message });
    // saving error
  }
};

export const removeAsyncObjectData = async (key, callback) => {
  try {
    if (typeof key !== 'string') return callback({ error: 'Unsupported data type, Only string allowed' });
    await AsyncStorage.removeItem(key);
    callback({ error: undefined });
  } catch (e) {
    callback({ error: e.message });
  }
};

export const switchLoginError = (errorCode) => {
  // console.log(errorCode);
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'The email is invalid or badly formatted';
    case 'auth/user-disabled':
      return "The user's accont is disabled.";
    case 'auth/user-not-found':
      return 'The does not exist on the platform or has been deleted.';
    case 'auth/wrong-password':
      return 'The login credentials do not match, try again.';
    default:
      return 'An error occured. Try again.';
  }
};

export const shuffleArray = (array) => {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [ array[currentIndex], array[randomIndex] ] = [ array[randomIndex], array[currentIndex] ];
  }

  return array;
};

export const shareEXtention = async (message, files, callback) => {
  await Share.open({ message, urls: [ files ] })
    .then((result) => callback({ success: true, result }))
    .catch((error) => console.log('Something went wrong--', error.message));
};

export const getsharableBase64 = async (uri, callback) => {
  await RNFetchBlob.fetch('GET', uri)
    .then((resp) => {
      if (resp.info().status == 200) {
        return callback({ success: true, result: `data:image/jpeg;base64,${resp.base64()}` });
      } else {
        return callback({ success: false, result: err });
      }
    })
    .catch((err) => callback({ success: false, result: err }));
};

export const getUser = (callback) => getAsyncObjectData('user', callback);
