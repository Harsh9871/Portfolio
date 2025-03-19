const express = require('express');
const router = express.Router();
const {
    getAllBlogs,
    addNewBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blogsController.js');

router.get('/', getAllBlogs);
router.post('/', addNewBlog);
router.get('/:id', getSingleBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);


module.exports = router;