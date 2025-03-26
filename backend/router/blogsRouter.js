const express = require('express');
const router = express.Router();
const {
    validateBlog,
    validateBlogByBlog,
    validateBlogById
} = require('../validation/blogValidator.js');
const {
    getAllBlogs,
    addNewBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blogsController.js');
router.get('/', getAllBlogs);
router.post('/',validateBlog, addNewBlog);
router.get('/:blog',validateBlogByBlog, getSingleBlog);
router.put('/:id' ,validateBlogById, updateBlog);
router.delete('/:id',validateBlogById, deleteBlog);


module.exports = router;