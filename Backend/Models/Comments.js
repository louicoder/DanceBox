const mongoose = require('mongoose');

const comments = new mongoose.Schema({
  authorId: String,
  dateCreated: String,
  comment: String,
  id: { type: String },
  commentType: {
    type: String,
    enum: [ 'blog', 'event' ]
  },
  likes: { type: Array }
});

module.exports = mongoose.model('comments', comments);
