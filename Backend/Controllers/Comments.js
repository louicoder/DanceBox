const { paginateHelper, userFiller } = require('../Helpers');
const { CommentsModel, AccountModel } = require('../Models');

const createComment = async (req, res) => {
  if (!req.body.type)
    return res.json({ success: false, result: 'Type of comment in query should either be event or blog' });
  if (!req.body.type === 'event' && !req.body.type === 'blog')
    return res.json({ success: false, result: 'Type of comment in query should either be event or blog' });
  if (!req.body.authorId) return res.json({ success: false, result: 'Author id is required but missing, try again' });
  if (!req.body.comment) return res.json({ success: false, result: 'Comment is required but missing, try again' });
  if (!req.body.id)
    return res.json({ success: false, result: 'Id of event of blog is required but missing, try again' });

  // const { type } = req.query;
  const { authorId, comment, id, type } = req.body;
  const payload = { authorId, comment, dateCreated: new Date().toISOString(), commentType: type.toLowerCase(), id };
  const comm = new CommentsModel(payload);
  try {
    console.log('Reached comment', req.body);
    await comm.save().then(async (result) => {
      const user = await AccountModel.findOne({ _id: authorId });
      console.log('RESULT', user._doc);
      res.json({ success: true, result: { ...result._doc, user } });
    });
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getBlogComments = async (req, res) => {
  if (!req.params.blogId) return res.json({ success: false, result: 'Blog id is required but missing, try again' });

  const { blogId: id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const total = await CommentsModel.find({ id, commentType: 'blog' }).countDocuments();
    console.log('Here in blog comments', total);
    const response = await CommentsModel.find({ id, commentType: 'blog' });
    let final = await userFiller(response, 'authorId');
    // final.sort((a, b) => b.dateCreated - a.dateCreated);
    return paginateHelper(page, limit, total, final, res);
  } catch (error) {
    // console.log('Final comments', error.message);
    return res.json({ success: false, result: error.message });
  }
};

const getEventComments = async (req, res) => {
  if (!req.params.eventId) return res.json({ success: false, result: 'Event id is required but missing, try again' });

  const { eventId: id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    // console.log('Here incomments');
    const total = await CommentsModel.find({ id, commentType: 'event' }).countDocuments();
    const response = await CommentsModel.find({ id, commentType: 'event' });
    let final = await userFiller(response, 'authorId');
    // final.sort((a, b) => b.dateCreated - a.dateCreated);
    return paginateHelper(page, limit, total, final, res);
  } catch (error) {
    // console.log('Final comments', error.message);
    return res.json({ success: false, result: error.message });
  }
};

module.exports = { createComment, getBlogComments, getEventComments };
