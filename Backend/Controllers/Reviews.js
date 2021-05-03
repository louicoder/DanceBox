const { ReviewsModel } = require('../Models');

const postReview = async () => {
  if (!req.body.review) return res.json({ success: false, result: 'Review cannot be empty, please add a review' });
  if (!req.body.owner || !req.body.owner.userId)
    return res.json({ success: false, result: 'Owner of review is required, please try again' });

  const Review = new ReviewsModel({ ...req.body });
  try {
    await Review.save().then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

const getUserReviews = async () => {
  if (!req.params.userId) return res.json({ success: false, result: 'User id is required, please try again' });
  // if (!req.body.owner || !req.body.owner.userId)
  //   return res.json({ success: false, result: 'Owner of review is required, please try again' });
  const { userId } = req.params;
  try {
    await ReviewsModel.find({ userId }).then((result) => res.json({ success: true, result }));
  } catch (error) {
    return res.json({ success: false, result: error.message });
  }
};

module.exports = { postReview, getUserReviews };
