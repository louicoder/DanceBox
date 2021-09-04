const router = require('express').Router();
const { CommentsController: CC } = require('../Controllers');

router.get('/event/:eventId', CC.getEventComments);
router.get('/blog/:blogId', CC.getBlogComments);
router.post('/:type/create', CC.createComment);

module.exports = router;
