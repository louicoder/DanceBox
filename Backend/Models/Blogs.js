const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  owner: { type: { email: String, imageUrl: String } },
  imageUrl: String,
  dateCreated: String,
  tags: { type: Array },
  likes: { type: Array },
  comments: { type: Array }
});

module.exports = mongoose.model('blogs', BlogSchema);
