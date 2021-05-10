const router = require('express').Router();
const { BlogsController: BG } = require('../Controllers');

router.get('/single/:blogId', BG.getBlog);
router.get('/user/:ownerUid', BG.getBlogsForSingleUser);
router.get('/search?', BG.searchBlogs);
router.patch('/update/:blogId', BG.updateBlog);
router.put('/like/:blogId', BG.likeBlog);
router.patch('/comments/create/:blogId', BG.createBlogComment);
router.delete('/delete/:blogId', BG.deleteBlog);
router.get('/random', BG.getRandomBlogs);
router.post('/create', BG.createBlog);
router.get('/all', BG.allBlogs);

module.exports = router;
