const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  authorId: String,
  imageUrl: { type: String, default: [] },
  dateCreated: String,
  tags: { type: Array, default: [] },
  likes: { type: Array, default: [] }
});

module.exports = mongoose.model('blogs', BlogSchema);
