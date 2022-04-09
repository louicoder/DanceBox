const router = require('express').Router();
const { CommentsController: CC } = require('../Controllers');

router.get('/all/:postId', CC.getPostComments);
router.post('/create', CC.createComment);
// router.post('/:type/create', CC.createComment);

module.exports = router;
