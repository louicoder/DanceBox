const { paginateHelper, userFiller, FIREBASE } = require('../Helpers');
const { PostsModel } = require('../Models');
const mongoose = require('mongoose');
// const {  PostsModel } = require('./');

const createPost = async (req, res) => {
  if (!req.body.description)
    return res.json({ success: false, result: 'Description cannot be empty, please add a description to continue' });
  if (!req.body.authorId)
    return res.json({ success: false, result: 'AuthorId is required but missing, please try again' });
  if (!req.body.type)
    return res.json({ success: false, result: 'Type of post is required but missing, please try again' });

  if (req.body.type === 'poll' && (!req.body.pollOptions || req.body.pollOptions.length < 2))
    return res.json({
      success: false,
      result: 'You should provide the poll options and they should be atleast 2 options'
    });

  if (req.body.type === 'event' && (!req.body.location || !req.body.eventDate || !req.body.eventInterval))
    return res.json({
      success: false,
      result: 'You should event date, event time and event interval in order to continue'
    });

  const Post = new PostsModel({ ...req.body, dateCreated: new Date().toISOString(), followers: [] });
  try {
    await Post.save().then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getPost = async (req, res) => {
  if (!req.params.postId) return res.json({ success: false, result: 'Post id is required, please try again' });
  // if (!req.body.owner || !req.body.owner.userId)
  //   return res.json({ success: false, result: 'Owner of review is required, please try again' });
  const { postId: _id } = req.params;
  try {
    await PostsModel.findOne({ _id }).then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getAllPosts = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;

  try {
    const total = await PostsModel.find({ type: 'post' }).countDocuments();
    // console.log('Total', total);
    await PostsModel.find({ type: 'post' })
      .sort({ dateCreated: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .then(async (result) => {
        let usersFilled = [];
        if (result.length) usersFilled = await userFiller([ ...result.map((r) => r._doc) ], 'authorId');
        return paginateHelper(page, limit, total, usersFilled, res);
      });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getAllEvents = async (req, res) => {
  const { page = 1, limit = 2, filter = '', filterValue = '' } = req.query;
  let query = { type: 'event' };
  if (filter && filterValue) query = { ...query, [filter]: filterValue };

  try {
    const total = await PostsModel.find(query).countDocuments();
    await PostsModel.find(query).limit(limit * 1).skip((page - 1) * limit).then(async (result) => {
      let usersFilled = [];
      if (result.length) usersFilled = await userFiller([ ...result.map((r) => r._doc) ], 'authorId');
      return paginateHelper(page, limit, total, usersFilled, res);
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getCalendarEvents = async (req, res) => {
  const { page = 1, limit = 10, eventInterval = '', filter = '' } = req.query;

  let query = { type: 'event' };
  if (eventInterval) query = { ...query, eventInterval };

  if (filter) query = { ...query, eventDate: { $regex: '.*' + filter + '.*', $options: 'i' } };

  try {
    const total = await PostsModel.find(query).countDocuments();
    // console.log('Total', total);
    await PostsModel.find(query).limit(limit * 1).skip((page - 1) * limit).then(async (result) => {
      console.log('RESS', [ ...result.map((r) => r._doc) ]);
      let usersFilled = [];
      if (result.length) usersFilled = await userFiller([ ...result.map((r) => r._doc) ], 'authorId');
      return paginateHelper(page, limit, total, usersFilled, res);
    });
  } catch (error) {
    console.log('QUERY', error.message);
    return res.json({ success: false, result: error.message });
  }
};

const getRandomPosts = async (req, res) => {
  const { limit: size = 5 } = req.query;
  try {
    await PostsModel.aggregate([ { $sample: { size } } ]).then(async (resp) => {
      // const user = FIREBASE.firestore().collection('users').doc()
      res.json({ success: true, result });
    });
    // return res.json({ success: false, result: 'It worked on' });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getRandomEvents = async (req, res) => {
  const { limit = 2 } = req.query;
  console.log('Size', limit);
  try {
    await PostsModel.aggregate([
      { $sample: { size: parseInt(limit) } },
      { $match: { type: 'event' } }
    ]).then(async (resp) => {
      const result = await userFiller(resp, 'authorId');
      // const user = FIREBASE.firestore().collection('users').doc()
      res.json({ success: true, result });
    });
    // return res.json({ success: false, result: 'It worked on' });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getUserPosts = async (req, res) => {
  if (!req.params.authorId) return res.json({ success: false, result: 'Author id is required, please try again' });
  const { page = 1, limit = 2 } = req.query;

  const { authorId } = req.params;

  try {
    const total = await PostsModel.find({ authorId }).countDocuments();
    await PostsModel.find({ authorId }).limit(limit * 1).skip((page - 1) * limit).then(async (result) => {
      // const userIds = [ ...result.map((r) => r.authorId) ];
      const final = userFiller(result, 'authorId', (resp) => {
        // const final = await addUserObject(userIds, result, 'authorId', res);
        // paginateHelper(page, limit, total, result, res);
        if (!resp.success) return res.json(res);
        return paginateHelper(page, limit, total, resp.result, res);
      });
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const updatePost = async (req, res) => {
  if (!req.params.postId) return res.json({ success: false, result: 'User id is required, please try again' });
  // if (!req.body.owner || !req.body.owner.postId)
  //   return res.json({ success: false, result: 'Owner of review is required, please try again' });
  const { postId: _id } = req.params;
  try {
    await PostsModel.updateOne({ _id }, req.body).then((result) => {
      if (result.nModified === 1) return res.json({ success: true, result: 'Successfully updated post' });
      return res.json({ success: false, result: 'Nothing was updated please try again' });
    });
  } catch (error) {
    console.log('POST UPDATE ERROR', error.message);
    return res.json({ success: false, result: error.message });
  }
};

const likePost = async (req, res) => {
  if (!req.body.userId) return res.json({ success: false, result: 'User id is required, please try again' });

  const { userId } = req.body;
  const { postId: _id } = req.params;

  try {
    const post = await PostsModel.updateOne({ _id }, { $push: { likes: userId } });
    // console.log('RESul', post);
    if (post.nModified <= 0) return res.json({ success: false, result: error.message });
    const result = await PostsModel.findOne({ _id });
    return res.json({ success: true, result });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const followPost = async (req, res) => {
  if (!req.body.userId) return res.json({ success: false, result: 'User id is required, please try again' });
  if (!req.params.postId) return res.json({ success: false, result: 'Post id is required, please try again' });

  const { userId } = req.body;
  const { postId: _id } = req.params;

  try {
    const post = await PostsModel.updateOne({ _id }, { $push: { followers: userId } });
    // console.log('RESul', post);
    if (post.nModified <= 0) return res.json({ success: false, result: error.message });
    const result = await PostsModel.findOne({ _id });
    return res.json({ success: true, result });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const deletePost = async (req, res) => {
  if (!req.params.postId) return res.json({ success: false, result: 'Post id is required, please try again' });
  const { postId: _id } = req.params;
  try {
    await PostsModel.deleteOne({ _id }).then((result) => {
      console.log('DElete', result);
      if (result.deletedCount > 0) return res.json({ success: true, result: 'Successfully updated post' });
      return res.json({ success: false, result: 'Nothing was updated please try again' });
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const searchPosts = async (req, res) => {
  if (!req.query.q) return res.json({ success: false, result: 'Query string cannot be empty please try again' });

  try {
    const { page = 1, limit = 10, q: filter } = req.query;
    // const titleString = { title: { $regex: '.*' + req.query.title + '.*', $options: 'i' } };
    // const nameString = { 'owner.name': { $regex: '.*' + req.query.title + '.*', $options: 'i' } };

    const query = {
      $or: [
        { description: { $regex: '.*' + filter + '.*', $options: 'i' } },
        { title: { $regex: '.*' + filter + '.*', $options: 'i' } }
      ]
    };
    const total = await PostsModel.find(query).countDocuments();
    // const totalPages = Math.ceil(count / limit);
    await PostsModel.find(query).limit(limit * 1).skip((page - 1) * limit).then(async (result) => {
      const usersFilled = await userFiller([ ...result.map((r) => r._doc) ], 'authorId');
      return paginateHelper(page, limit, total, usersFilled, res);
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  likePost,
  getUserPosts,
  getAllPosts,
  getRandomPosts,
  getRandomEvents,
  getAllEvents,
  deletePost,
  getCalendarEvents,
  searchPosts,
  followPost
};
