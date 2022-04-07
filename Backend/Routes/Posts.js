const router = require('express').Router();
const { PostsController: PC } = require('../Controllers');

router.post('/create', PC.createPost);
router.get('/all', PC.getAllPosts);
router.get('/random', PC.getRandomPosts);
router.patch('/update/:postId', PC.updatePost);
router.get('/author/:authorId', PC.getUserPosts);
router.patch('/like/:postId', PC.likePost);
router.post('/delete/:postId', PC.deletePost);
router.get('/:postId', PC.getPost);
// router.get('/blog/:blogId', PC.getBlogComments);
// router.post('/:type/create', PC.createComment);

module.exports = router;
