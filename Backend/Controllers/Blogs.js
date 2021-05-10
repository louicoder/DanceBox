const { BlogsModel } = require('../Models');

const createBlog = async (req, res) => {
  console.log('Hit create');
  try {
    const { title = '', description, owner, imageUrl = '', tags, owner: {} } = req.body;
    const payload = { title, description, owner, imageUrl, tags, dateCreated: new Date().toISOString() };
    const NewBlog = new BlogsModel(payload);
    await NewBlog.save().then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getBlog = async (req, res) => {
  console.log('Hit getblog');

  if (!req.params.blogId) return res.json({ success: false, result: 'Blog id is required but missing' });
  const { blogId: _id } = req.params;
  try {
    await BlogsModel.findOne({ _id }).then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getRandomBlogs = async (req, res) => {
  try {
    await BlogsModel.aggregate([ { $sample: { size: 5 } } ]).then((result) => res.json({ success: true, result }));
    // return res.json({ success: false, result: 'It worked on' });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getBlogsForSingleUser = async (req, res) => {
  if (!req.params.ownerUid) return res.json({ success: false, result: 'Owner uid is required but missing' });
  const { ownerUid } = req.params;
  try {
    await BlogsModel.find({ 'owner.uid': ownerUid }).then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const allBlogs = async (req, res) => {
  try {
    await BlogsModel.find().then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const updateBlog = (req, res) => {
  console.log('Hit updateblog');

  if (!req.params.blogId) return res.json({ success: false, result: 'Blog id is required but missing' });
  const { blogId: _id } = req.params;
  try {
    BlogsModel.updateOne({ _id }, req.body, (err) => {
      if (err) return res.json({ success: false, result: error.message });
      return res.json({ success: true, result: 'Successfully updated blog' });
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const createBlogComment = (req, res) => {
  if (!req.params.blogId) return res.json({ success: false, result: 'Blog id is required but missing' });
  if (!req.body.owner) return res.json({ success: false, result: 'Owner details are required but missing' });
  if (!req.body.owner.email) return res.json({ success: false, result: 'Owner email is required but missing' });
  if (!req.body.owner.uid) return res.json({ success: false, result: 'Owner uid is required but missing' });

  const { blogId: _id } = req.params;
  try {
    BlogsModel.updateOne(
      { _id },
      { $push: { comments: { ...req.body, dateCreated: new Date().toISOString() } } },
      (err) => {
        if (err) return res.json({ success: false, result: error.message });
        return res.json({ success: true, result: 'Successfully created comment' });
      }
    );
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const likeBlog = (req, res) => {
  if (!req.params.blogId) return res.json({ success: false, result: 'Blog id is required in the params but missing' });
  if (!req.params.uid) return res.json({ success: false, result: 'User id is required in the params but missing' });

  const { blogId: _id, uid } = req.params;
  try {
    BlogsModel.updateOne({ _id }, { $push: { likes: uid } }, (err, result) => {
      if (err) return res.json({ success: false, result: error.message });
      return res.json({ success: true, result: 'Successfully liked  blog' });
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const deleteBlog = async (req, res) => {
  if (!req.params.blogId) return res.json({ success: false, result: 'Blog id is required but missing' });
  const { blogId: _id } = req.params;
  try {
    await BlogsModel.deleteOne({ _id }).then((result) => {
      if (result.deletedCount < 1)
        return res.json({ success: false, result: 'Nothing was deleted try again and make sure the blog exists' });
      return res.json({ success: true, result: 'Successfully deleted blog' });
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const searchBlogs = async (req, res) => {
  if (!req.query.title) return res.json({ success: false, result: 'Event title is required but missing' });

  try {
    const { page = 1, limit = 1 } = req.query;
    const titleString = { title: { $regex: '.*' + req.query.title + '.*', $options: 'i' } };
    const nameString = { 'owner.name': { $regex: '.*' + req.query.title + '.*', $options: 'i' } };
    const count = await BlogsModel.find({ $or: [ titleString, nameString ] }).countDocuments();
    const totalPages = Math.ceil(count / limit);
    await BlogsModel.find({ $or: [ titleString, nameString ] })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .then((result) => {
        return res.json({
          success: true,
          result,
          count,
          currentPage: parseInt(page),
          totalPages,
          nextPage: parseInt(page) + 1,
          lastPage: parseInt(page) === totalPages,
          previousPage: page - 1 === 0 ? 1 : parseInt(page) - 1
        });
      });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

module.exports = {
  createBlog,
  getBlog,
  getRandomBlogs,
  getBlogsForSingleUser,
  updateBlog,
  deleteBlog,
  allBlogs,
  createBlogComment,
  likeBlog,
  searchBlogs
};
