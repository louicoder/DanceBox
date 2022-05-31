const router = require('express').Router();
const { PostsController: PC } = require('../Controllers');

router.post('/create', PC.createPost);
router.get('/all', PC.getAllPosts);
router.get('/random/events', PC.getRandomEvents);
router.patch('/update/:postId', PC.updatePost);
router.get('/author/:authorId', PC.getUserPosts);
router.patch('/like/:postId', PC.likePost);
router.patch('/follow/:postId', PC.followPost);
router.post('/delete/:postId', PC.deletePost);
router.get('/search', PC.searchPosts);
router.get('/events/all', PC.getAllEvents);
router.get('/events/filter', PC.getCalendarEvents);
router.get('/single/:postId', PC.getPost);
// router.get('/blog/:blogId', PC.getBlogComments);
// router.post('/:type/create', PC.createComment);

module.exports = router;
