const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    keyPoints:{
        type: [String],
        required: true,
    },
    svg:{
        type: String,
        required: true,
    }

}, {timestamps: true});


module.exports = mongoose.model('Service', serviceSchema);
