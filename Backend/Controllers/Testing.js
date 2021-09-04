const { AccountModel, BlogsModel, EventsModel, CommentsModel } = require('../Models');

const update = async (req, res) => {
  try {
    const events = await BlogsModel.find({});
    // const res = await BlogsModel.update({});
    // console.log('Events', [ ...events.map((r) => r._doc.owner.uid) ]);
    for (const r of events) {
      await BlogsModel.updateOne({ 'owner.uid': r._doc.owner.uid }, { authorId: r._doc.owner.uid });
    }
    return res.json({ success: true, result: 'yes' });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const deleti = async (req, res) => {
  try {
    // await
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

module.exports = { update, deleti };
