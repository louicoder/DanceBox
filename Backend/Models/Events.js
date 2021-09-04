const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: String,
  endDate: String,
  contact: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  venue: { type: String, required: true },
  description: { type: String, required: true },
  free: { type: Boolean, default: true },
  price: { type: String, default: '0' },
  tags: { type: Array, default: [] },
  category: { type: Array, default: [] },
  dateCreated: { type: String },
  ticketCompany: { type: String, default: '' },
  judges: { type: Array, default: [] },
  judgingCriteria: {
    type: String,
    enum: [ 'judges', 'audience', 'both' ],
    default: 'judges'
  },
  noOfJudges: { type: String, default: '3' },
  judgingNotes: { type: String, default: '' },
  attending: { type: Array, default: [] },
  participating: { type: Array, default: [] },
  likes: { type: Array, default: [] },
  authorId: String
});

module.exports = mongoose.model('events', eventSchema);
