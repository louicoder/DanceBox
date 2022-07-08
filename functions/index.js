const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// const path = require('path');

const APP_URL = 'https://dance-box-2022.el.r.appspot.com/api';

const fs = require('fs');
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const mkdirp = require('mkdirp');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const { email, uid, displayName: name = '', photoURL = '', emailVerified, phoneNumber = '' } = user;
  admin.firestore().collection('users').doc(`${uid}`).set({
    email,
    uid,
    name,
    photoURL,
    emailVerified,
    phoneNumber,
    following: [],
    followers: [],
    dateCreated: new Date().toISOString()
  });

  // await axios.post(`${APP_URL}/account/create`)
});

exports.resizeImage = functions.storage.object().onFinalize(async (object) => {
  try {
    // Attributes of the image:
    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name; // File path in the bucket.
    const contentType = object.contentType; // File content type.
    const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

    functions.logger.log(':::FILE:::', object);
    // Exit if this is triggered on a file that is not an image.
    if (!contentType.startsWith('image/')) {
      return functions.logger.log('This is not an image.');
    }

    // Get the file name.
    const fileName = path.basename(filePath);
    // Exit if the image is already a thumbnail.
    if (fileName.startsWith('thumb_')) {
      return functions.logger.log('Already a Thumbnail.');
    }

    // Download file from bucket.
    const bucket = admin.storage().bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = {
      contentType: contentType
    };
    await bucket.file(filePath).download({ destination: tempFilePath });
    functions.logger.log('Image downloaded locally to', tempFilePath);

    // Generate a thumbnail using ImageMagick.
    await spawn('convert', [ tempFilePath, '-thumbnail', '500x500>', tempFilePath ]);
    functions.logger.log('Thumbnail created at', tempFilePath);

    // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
    const thumbFileName = `thumb_${fileName}`;
    const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);

    // Uploading the thumbnail.
    await bucket
      .upload(tempFilePath, {
        destination: thumbFilePath,
        metadata: metadata
      })
      .then(async (r) => {
        const signedURL = await bucket.file().getSignedUrl({ action: 'read', expires: Date.now() + 60 * 1000 });
        console.log('::::SUCCCESS TRANSFORMED IMAGE::::', signedURL);
      });

    await bucket.file(filePath).getSignedUrl().then((url) => {
      functions.logger.log('Thumbnail created at', url);
    });

    // Once the thumbnail has been uploaded delete the local file to free up disk space.
    return fs.unlinkSync(tempFilePath);
  } catch (error) {
    console.log('::::ERROR TRANSFORMING IMAGE::::', error.message);
  }
});
