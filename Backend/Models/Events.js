const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  owner: { type: { uid: String, imageUrl: String, name: String, email: String } },
  title: String,
  date: String,
  time: String,
  contact: String,
  imageUrl: String,
  venue: String,
  description: String,
  free: Boolean,
  price: Number,
  category: {
    type: String,
    enum: [ 'competition', 'performance', 'workshop', 'class', 'festival', 'video shoot' ],
    default: 'competition'
  },
  dateCreated: String,
  ticketCompany: String,
  judges: { type: Array },
  judgingCriteria: {
    type: String,
    enum: [ 'judges', 'audience', 'both' ],
    default: 'judges'
  },
  judgingNotes: String,
  attending: { type: [] },
  participating: { type: [] },
  likes: { type: [] },
  comments: { type: [] }
});

module.exports = mongoose.model('events', eventSchema);
