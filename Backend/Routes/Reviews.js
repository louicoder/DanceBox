const router = require('express').Router();
const { ReviewsController: RC } = require('../Controllers');

router.post('/create', RC.postReview);
router.get('/all', RC.getUserReviews);

module.exports = router;
