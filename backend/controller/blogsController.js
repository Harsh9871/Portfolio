const Blog = require('../model/blogs');

// @desc    Get all blogs
// @route   GET /api/blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs.map(result => ({
                id: result._id,
                title: result.title,
                slug: result.slug,
                description: result.description,
                otherBlogs: result.otherBlogs,
            }))
        });
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// @desc    Add new blog
// @route   POST /api/blogs
exports.addNewBlog = async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json({
            success: true, data: {
                id: savedBlog._id,
                title: savedBlog.title,
                slug: savedBlog.slug,
                description: savedBlog.description,
                otherProjects: savedBlog.otherProjects

            }
        });
    } catch (err) {
        res.status(400).json({success: false, message: err.message});
    }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
exports.getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.blog });
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
        res.status(200).json({ success: true, data: blog });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
exports.updateBlog = async (req, res) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                error: 'Enter some value for update'
            })
        }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedBlog) return res.status(404).json({success: false, message: "Blog not found"});
        res.status(200).json({success: true, data: updatedBlog});
    } catch (err) {
        res.status(400).json({success: false, message: err.message});
    }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({success: false, message: "Blog not found"});
        res.status(200).json({success: true, message: "Blog deleted successfully"});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};
