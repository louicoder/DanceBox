const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  address: { type: String },
  dateCreated: { type: String },
  username: { type: String },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: String, required: true, unique: true },
  photoURL: { type: String },
  interests: { type: Array },
  favorites: { type: Array },
  professions: { type: Array },
  uid: { type: String },
  about: { type: String },
  followers: { type: Array },
  following: { type: Array },
  password: { type: String, required: true }
});

module.exports = mongoose.model('users', UserSchema);
