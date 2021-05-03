const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  startDate: String,
  endDate: String,
  contact: String,
  imageUrl: String,
  venue: String,
  description: String,
  free: Boolean,
  price: Number,
  tags: { type: Array },
  category: { type: Array },
  dateCreated: String,
  ticketCompany: String,
  judges: { type: Array },
  judgingCriteria: {
    type: String,
    enum: [ 'judges', 'audience', 'both' ],
    default: 'judges'
  },
  noOfJudges: Number,
  judgingNotes: String,
  attending: { type: Array },
  participating: { type: Array },
  likes: { type: Array },
  comments: { type: Array },
  owner: {}
});

module.exports = mongoose.model('events', eventSchema);
