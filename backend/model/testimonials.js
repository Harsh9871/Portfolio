const mongoose = require('mongoose')
const testimonialsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    }
    
}, { timestamps: true })

const Testimonials = mongoose.model('Testimonials', testimonialsSchema)
module.exports = Testimonials