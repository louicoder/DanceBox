const { paginateHelper, userFiller, dateWithoutOffset } = require('../Helpers');
const { CommentsModel, AccountModel } = require('../Models');

const FIREBASE = require('../Helpers/FirebaseServices');

const createComment = async (req, res) => {
  if (!req.body.postId) return res.json({ success: false, result: 'Post Id is required but is missing, try again' });
  if (!req.body.authorId) return res.json({ success: false, result: 'Author id is required but missing, try again' });
  if (!req.body.comment) return res.json({ success: false, result: 'Comment is required but missing, try again' });

  // const { type } = req.query;
  const { postId, comment, authorId } = req.body;
  const payload = { postId, authorId, comment, dateCreated: dateWithoutOffset(), likes: [] };
  const COMM = new CommentsModel(payload);
  try {
    const comment = await COMM.save();
    const fbUser = await FIREBASE.collection('users').doc(authorId).get();
    const user = { ...fbUser.data(), uid: fbUser.id };
    const result = { ...comment._doc, user };
    console.log('COMmeNT----', result);
    return res.json({ success: true, result });
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

const likeComment = async (req, res) => {
  if (!req.body.userId) return res.json({ success: false, result: 'User id is required, please try again' });

  const { userId } = req.body;
  const { postId: _id } = req.params;

  try {
    const post = await CommentsModel.updateOne({ _id }, { $push: { likes: userId } });
    // console.log('RESul', post);
    if (post.nModified <= 0) return res.json({ success: false, result: error.message });
    const result = await CommentsModel.findOne({ _id });
    return res.json({ success: true, result });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getPostComments = async (req, res) => {
  if (!req.params.postId) return res.json({ success: false, result: 'Event id is required but missing, try again' });

  const { postId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const total = await CommentsModel.find({ postId }).countDocuments();
    CommentsModel.find({ postId }).limit(limit * 1).skip((page - 1) * limit).then(async (response) => {
      const users = [ ...response.map((r) => r._doc) ];
      let final = await userFiller(users, 'authorId');
      return paginateHelper(page, limit, total, final, res);
    });
  } catch (error) {
    // console.log('Final comments', error.message);
    return res.json({ success: false, result: error.message });
  }
};

module.exports = { createComment, getBlogComments, getPostComments, likeComment };
