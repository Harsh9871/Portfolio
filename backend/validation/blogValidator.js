const Blog = require("../model/blogs.js");
exports.validateBlog = async(req, res,next) => {
    const {title,slug,description,otherBlogs} = req.body
    if(!title){
        return res.status(400).json({
            error: 'title is required'
        })
    }
    if(!slug){
        return res.status(400).json({
            error: 'slug is required'
        })
    }
    if(!description){
        return res.status(400).json({
            error: 'description is required'
        })
    }
    if(!otherBlogs){
        return res.status(400).json({
            error: 'otherBlogs is required'
        })
    }
    let otherBlogsArray = Array.isArray(otherBlogs) ? otherBlogs : [otherBlogs];

    const existingBlogs = await Blog.find({ _id: { $in: otherBlogsArray } });

    if (existingBlogs.length !== otherBlogsArray.length) {
        return res.status(400).json({ message: 'Some referenced blogs are invalid' });
    }
    next()
}
exports.validateBlogById = async(req, res,next) => {
    const result = await Blog.find(req.params.blog)
    if(!result){
        return res.status(404).json({
            error: 'Blog does not exist'
        })
    }


    next()
}
exports.validateBlogByBlog = async(req, res,next) => {
    const result = await Blog.find(req.params.id)
    if(!result){
        return res.status(404).json({
            error: 'Blog does not exist'
        })
    }
    next()
}