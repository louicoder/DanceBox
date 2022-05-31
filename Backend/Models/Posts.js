const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  // All across props
  type: { type: String, enum: [ 'post', 'event' ], required: true },
  title: { type: String },
  likes: { type: Array, default: [] },
  authorId: { type: String, required: true },
  dateCreated: { type: String },
  description: { type: String },
  followers: { type: Array },
  imageUrl: { type: String },
  categories: { type: Array, default: [] },

  // EVent only props::
  // eventTime: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  eventInterval: { type: String, enum: [ 'once', 'daily', 'weekly' ] },
  location: { type: String },

  // Poll props
  pollOptions: { type: Array, validate: [ (val) => val.length < 2, 'Options should be atleast two, try again' ] }
});

module.exports = mongoose.model('posts', PostSchema);
