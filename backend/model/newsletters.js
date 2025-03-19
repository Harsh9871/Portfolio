const mongoose = require('mongoose');

const newsletter = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: 'Enter Valid Email'
        }
    },
    isSubscribed: {
        type: Boolean,
        default: true
    }

}, {timestamps: true});



const Newsletter= mongoose.model('Newsletter', newsletter);
module.exports = Newsletter;