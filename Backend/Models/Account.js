const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  accountType: { type: String, enum: [ 'individual', 'company' ] },
  companyAddress: { type: String },
  companyDescription: { type: String },
  companyName: { type: String },
  companyType: { type: String },
  dateCreated: { type: String },
  eventCategories: { type: Array },
  name: { type: String },
  username: { type: String },
  email: { type: String, required: true },
  imageUrl: { type: String },
  interests: { type: Array },
  facebook: { type: String },
  youtube: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  linkedin: { type: String },
  uid: { type: String },
  whatsapp: { type: String },
  about: { type: String },
  followers: { type: Array },
  following: { type: Array }
});

module.exports = mongoose.model('users', UserSchema);
