const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  owner: { type: { email: String, imageUrl: String } },
  imageUrl: String,
  dateCreated: String,
  tags: { type: Array },
  likes: { type: [ { uid: String, imageUrl: String, name: String, email: String } ] },
  comments: { type: [ { uid: String, imageUrl: String, name: String, email: String } ] }
});

module.exports = mongoose.model('blogs', BlogSchema);
