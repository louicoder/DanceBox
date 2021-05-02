const { BlogsModel } = require('../Models');

const createBlog = async (req, res) => {
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
  if (!req.params.blogId) return res.json({ success: false, result: 'Blog id is required but missing' });
  const { blogId: _id } = req.params;
  try {
    await BlogsModel.findOne({ _id }).then((result) => res.json({ success: false, result }));
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

const updateBlog = async (req, res) => {
  if (!req.params.blogId) return res.json({ success: false, result: 'Blog id is required but missing' });
  const { blogId: _id } = req.params;
  try {
    await BlogsModel.updateOne({ _id }, req.body).then((result) => {
      if (result.nModified === 1) return res.json({ success: true, result: 'Successfully updated blog' });
      console.log('updated', result);
      return res.json({ success: false, result: 'Nothing was updated please try again' });
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

module.exports = { createBlog, getBlog, getRandomBlogs, getBlogsForSingleUser, updateBlog, deleteBlog, allBlogs };
