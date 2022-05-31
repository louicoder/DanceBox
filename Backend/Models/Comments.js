const mongoose = require('mongoose');

const comments = new mongoose.Schema({
  replies: { type: Array },
  postId: { type: String },
  authorId: { type: String },
  dateCreated: { type: String },
  comment: { type: String },
  likes: { type: Array, default: [] }
});

module.exports = mongoose.model('comments', comments);
