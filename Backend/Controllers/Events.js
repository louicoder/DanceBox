const { EventsModel } = require('../Models');

const createEvent = async (req, res) => {
  // if(!req.body.title) return res.json({success:false, result: 'Description for the event is re'})

  try {
    const {
      owner,
      title = '',
      date,
      time,
      startDate,
      endDate,
      venue,
      contact,
      imageUrl,
      description,
      free,
      price,
      tags,
      category,
      ticketCompany,
      judges = [],
      judgingCriteria,
      judgingNotes,
      noOfJudges
    } = req.body;
    const payload = {
      owner,
      tags,
      title,
      date,
      time,
      contact,
      imageUrl,
      venue,
      description,
      free,
      price,
      startDate,
      endDate,
      category,
      noOfJudges,
      // dateCreated,
      ticketCompany,
      judges,
      judgingCriteria,
      judgingNotes,
      attending: [],
      participanting: [],
      likes: [],
      comments: [],
      dateCreated: new Date().toISOString()
    };
    const NewEvent = new EventsModel(payload);
    await NewEvent.save().then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getEvent = async (req, res) => {
  if (!req.params.eventId) return res.json({ success: false, result: 'Event id is required but missing' });
  if (!req.params.eventId.lenght === 24) return res.json({ success: false, result: 'Event id is not valid' });
  const { eventId: _id } = req.params;
  try {
    await EventsModel.findOne({ _id }).then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getRandomEvents = async (req, res) => {
  try {
    await EventsModel.aggregate([ { $sample: { size: 5 } } ]).then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

// participate
const participateInEvent = (req, res) => {
  if (!req.params.eventId) return res.json({ success: false, result: 'Blog id is required but missing' });
  if (!req.body) return res.json({ success: false, result: 'Owner details are required but missing' });
  if (!req.body.email) return res.json({ success: false, result: 'Owner email is required but missing' });
  if (!req.body.uid) return res.json({ success: false, result: 'Owner uid is required but missing' });

  // const { comment, owner } = req.body;
  // const payload = {comment, owner}
  const { eventId: _id } = req.params;
  try {
    EventsModel.updateOne(
      { _id },
      { $push: { participating: { ...req.body, dateCreated: new Date().toISOString() } } },
      (err) => {
        if (err) return res.json({ success: false, result: error.message });
        return res.json({ success: true, result: 'Successfully added you participants list' });
      }
    );
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

// unparticipate
const unparticipateInEvent = (req, res) => {
  if (!req.params.eventId) return res.json({ success: false, result: 'Blog id is required but missing' });
  if (!req.params.uid) return res.json({ success: false, result: "User's id  required but missing" });

  // const { comment, owner } = req.body;
  // const payload = {comment, owner}
  const { eventId: _id } = req.params;
  try {
    EventsModel.updateOne({ _id }, { $pull: { participating: { uid: req.params.uid } } }, (err) => {
      if (err) return res.json({ success: false, result: err.message });
      return res.json({ success: true, result: 'Successfully removed you from participating list' });
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

// Attend
const attendEvent = (req, res) => {
  if (!req.params.eventId) return res.json({ success: false, result: 'Blog id is required but missing' });
  if (!req.body) return res.json({ success: false, result: 'Owner details are required but missing' });
  if (!req.body.email) return res.json({ success: false, result: 'Owner email is required but missing' });
  if (!req.body.uid) return res.json({ success: false, result: 'Owner uid is required but missing' });

  // const { comment, owner } = req.body;
  // const payload = {comment, owner}
  const { eventId: _id } = req.params;
  try {
    EventsModel.updateOne(
      { _id },
      { $push: { attending: { ...req.body, dateCreated: new Date().toISOString() } } },
      (err) => {
        if (err) return res.json({ success: false, result: error.message });
        return res.json({ success: true, result: 'Successfully added you attedance list' });
      }
    );
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const unattendEvent = (req, res) => {
  if (!req.params.eventId) return res.json({ success: false, result: 'Blog id is required but missing' });
  if (!req.params.uid) return res.json({ success: false, result: "User's id  required but missing" });

  // const { comment, owner } = req.body;
  // const payload = {comment, owner}
  const { eventId: _id } = req.params;
  try {
    EventsModel.updateOne({ _id }, { $pull: { attending: { uid: req.params.uid } } }, (err) => {
      if (err) return res.json({ success: false, result: err.message });
      return res.json({ success: true, result: 'Successfully removed you from attedance list' });
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const likeEvent = (req, res) => {
  if (!req.params.eventId)
    return res.json({ success: false, result: 'Event id is required in the params but missing' });
  if (!req.params.uid) return res.json({ success: false, result: 'User id is required in the params but missing' });
  const { eventId: _id, uid } = req.params;

  try {
    EventsModel.updateOne({ _id }, { $push: { likes: uid } }, (err, result) => {
      if (err) return res.json({ success: false, result: error.message });
      return res.json({ success: true, result: 'Successfully liked  event' });
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const createEventComment = (req, res) => {
  if (!req.params.eventId) return res.json({ success: false, result: 'Event id is required but missing' });
  if (!req.body.owner) return res.json({ success: false, result: 'Owner details are required but missing' });
  if (!req.body.owner.email) return res.json({ success: false, result: 'Owner email is required but missing' });
  if (!req.body.owner.uid) return res.json({ success: false, result: 'Owner uid is required but missing' });

  const { eventId: _id } = req.params;
  try {
    EventsModel.updateOne(
      { _id },
      { $push: { comments: { ...req.body, dateCreated: new Date().toISOString() } } },
      (err) => {
        if (err) return res.json({ success: false, result: error.message });
        return res.json({ success: true, result: 'Successfully created comment' });
      }
    );
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getEventsForSingleUser = async (req, res) => {
  if (!req.params.ownerUid) return res.json({ success: false, result: 'Owner uid is required but missing' });
  console.log('RE params', req.params);
  const { ownerUid } = req.params;
  try {
    await EventsModel.find({ 'owner.uid': ownerUid }).then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const allEvents = async (req, res) => {
  try {
    await EventsModel.find().then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getEventsInMonth = async (req, res) => {
  if (!req.params.month) return res.json({ success: false, result: 'Month to query is required, try again' });
  const { month } = req.params;
  console.log('Checking month', month);

  try {
    await EventsModel.find(
      { startDate: { $regex: month, $options: 'i' } },
      { title: 1, tags: 1, imageUrl: 1, price: 1, startDate: 1, dateCreated: 1 }
    ).then((result) => {
      console.log('RESULT', result);
      res.json({ success: true, result });
    });

    // const events = await EventsModel.find({ startDate: { $regex: month, $options: 'i' } })
    //   .project({ title: 1, tags: 1, imageUrl: 1, price: 1 })
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const updateEvent = async (req, res) => {
  if (!req.params.eventId) return res.json({ success: false, result: 'Blog id is required but missing' });
  const { eventId: _id } = req.params;
  try {
    await EventsModel.updateOne({ _id }, req.body).then((result) => {
      if (result.nModified === 1) return res.json({ success: true, result: 'Successfully updated event' });
      return res.json({ success: false, result: 'Nothing was updated please try again' });
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const deleteEvent = async (req, res) => {
  if (!req.params.event) return res.json({ success: false, result: 'Event id is required but missing' });
  const { event: _id } = req.params;
  try {
    await EventsModel.deleteOne({ _id }).then((result) => {
      if (result.deletedCount < 1)
        return res.json({ success: false, result: 'Nothing was deleted try again and make sure the event exists' });
      return res.json({ success: true, result: 'Successfully deleted blog' });
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const searchEvent = async (req, res) => {
  if (!req.query.title) return res.json({ success: false, result: 'Event title is required but missing' });

  try {
    const { page = 1, limit = 1 } = req.query;
    const nameString = { title: { $regex: '.*' + req.query.title + '.*', $options: 'i' } };
    const titleString = { 'owner.name': { $regex: '.*' + req.query.title + '.*', $options: 'i' } };
    // const emailString = { 'owner.email': { $regex: '.*' + req.query.title + '.*', $options: 'i' } };
    const count = await EventsModel.find({ $or: [ titleString, nameString ] }).countDocuments();
    const totalPages = Math.ceil(count / limit);
    await EventsModel.find({ $or: [ titleString, nameString ] })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .then((result) => {
        return res.json({
          success: true,
          result,
          count,
          currentPage: parseInt(page),
          totalPages,
          nextPage: parseInt(page) + 1,
          lastPage: parseInt(page) === totalPages,
          previousPage: page - 1 === 0 ? 1 : parseInt(page) - 1
        });
      });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

module.exports = {
  createEvent,
  getEvent,
  getRandomEvents,
  getEventsForSingleUser,
  updateEvent,
  deleteEvent,
  allEvents,
  participateInEvent,
  attendEvent,
  likeEvent,
  createEventComment,
  unattendEvent,
  unparticipateInEvent,
  searchEvent,
  getEventsInMonth
};
