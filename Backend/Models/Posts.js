const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  // All across props
  type: { type: String, enum: [ 'post', 'event', 'poll' ], required: true },
  likes: { type: Array, default: [] },
  authorId: { type: String, required: true },
  dateCreated: { type: String },
  description: { type: String, required: true },
  followers: { type: Array },

  // EVent only props::
  eventTime: { type: String },
  eventDate: { type: String },
  eventInterval: { type: String, enum: [ 'once', 'daily', 'monthly', 'forever' ] },

  // Poll props
  pollOptions: { type: Array, validate: [ (val) => val.length < 2, 'Options should be atleast two, try again' ] }
});

module.exports = mongoose.model('posts', PostSchema);
