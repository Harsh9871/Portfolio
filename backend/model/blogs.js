const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    otherBlogs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Blog',
        validate: {
            validator: async function (value) {
                if (!value.length) return true; // Allow empty array
                const count = await mongoose.model('Blog').countDocuments({ _id: { $in: value } });
                return count === value.length;
            },
            message: 'One or more Blog IDs in otherBlogs are invalid.'
        }
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
