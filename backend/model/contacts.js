const monngoose = require('mongoose')
const { validate } = require('./Projects')
const contactSchema = new monngoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Contact = monngoose.model('Contact', contactSchema)
module.exports = Contact