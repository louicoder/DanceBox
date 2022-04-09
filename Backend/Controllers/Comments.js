const { paginateHelper, userFiller, dateWithoutOffset } = require('../Helpers');
const { CommentsModel, AccountModel } = require('../Models');

// const admin = require('firebase-admin');
require('dotenv').config();

// import firebase from 'firebase-admin';
// var serviceAccount = require('../dance-box-2022-firebase-adminsdk-ghdm1-206e97b937');

// const FIREBASE = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: process.env.DATABASE_URL
// });

const createComment = async (req, res) => {
  if (!req.body.postId) return res.json({ success: false, result: 'Post Id is required but is missing, try again' });
  if (!req.body.authorId) return res.json({ success: false, result: 'Author id is required but missing, try again' });
  if (!req.body.comment) return res.json({ success: false, result: 'Comment is required but missing, try again' });

  // const { type } = req.query;
  const { postId, comment, authorId } = req.body;
  const payload = { postId, authorId, comment, dateCreated: dateWithoutOffset(), likes: [], replies: [] };
  const COMM = new CommentsModel(payload);
  try {
    console.log('Reached comment', req.body);
    await COMM.save().then(async (result) => {
      const user = await AccountModel.findOne({ _id: authorId });
      console.log('RESULT', user._doc);
      res.json({ success: true, result: { ...result._doc, user } });
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getBlogComments = async (req, res) => {
  if (!req.params.blogId) return res.json({ success: false, result: 'Blog id is required but missing, try again' });

  const { blogId: id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const total = await CommentsModel.find({ id, commentType: 'blog' }).countDocuments();
    console.log('Here in blog comments', total);
    const response = await CommentsModel.find({ id, commentType: 'blog' });
    let final = await userFiller(response, 'authorId');
    // final.sort((a, b) => b.dateCreated - a.dateCreated);
    return paginateHelper(page, limit, total, final, res);
  } catch (error) {
    // console.log('Final comments', error.message);
    return res.json({ success: false, result: error.message });
  }
};

const getPostComments = async (req, res) => {
  if (!req.params.postId) return res.json({ success: false, result: 'Event id is required but missing, try again' });

  const { postId: _id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    // const snap = await FIREBASE.firestore()
    //   .collection('users')
    //   .where('uid', 'in', [ '9CHNXcrxvTg75wvNvH2z53uD7zI3', 'A7Lk7xgG7yUfG6e4Zzy2leIeLCb2' ])
    //   .get();
    // const docs = [ ...snap.docs.map((r) => ({ ...r.data(), id: r.id })) ];
    // return res.json({ success: true, result: docs });

    // console.log('Here incomments');
    const total = await CommentsModel.find({ _id }).countDocuments();
    const response = await CommentsModel.find({ _id });
    let final = await userFiller(response, 'authorId');
    // final.sort((a, b) => b.dateCreated - a.dateCreated);
    return paginateHelper(page, limit, total, final, res);
  } catch (error) {
    // console.log('Final comments', error.message);
    return res.json({ success: false, result: error.message });
  }
};

module.exports = { createComment, getBlogComments, getPostComments };
