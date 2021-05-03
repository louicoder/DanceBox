const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  review: { type: String, required: true },
  owner: { type: { email: String, imageUrl: String, email: String } },
  dateCreated: String
});

module.exports = mongoose.model('reviews', ReviewSchema);
