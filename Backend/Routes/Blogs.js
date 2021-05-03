const router = require('express').Router();
const { BlogsController: BG } = require('../Controllers');

router.post('/create', BG.createBlog);
router.get('/single/:blogId', BG.getBlog);
router.get('/random', BG.getRandomBlogs);
router.get('/all', BG.allBlogs);
router.get('/user/:ownerUid', BG.getBlogsForSingleUser);
router.patch('/update/:blogId', BG.updateBlog);
router.patch('/like/:blogId', BG.likeBlog);
router.patch('/comments/create/:blogId', BG.createBlogComment);
router.delete('/delete/:blogId', BG.deleteBlog);

module.exports = router;
