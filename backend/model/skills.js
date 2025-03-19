const mongoose = require('mongoose');

const skills = new mongoose.Schema({

    heading:{
        type:[
            {
                name:String,
                technologies:[
                    {
                        name:{type:String},
                        value:{type:Number},
                    }
                ]
            }
        ],
        required: true,
        unique: true,
    }


}, {timestamps: true});


module.exports = mongoose.model('Skill', skills);
