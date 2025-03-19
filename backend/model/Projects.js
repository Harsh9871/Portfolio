const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
    bgImage: {
        type: String,
        default: 'https://placehold.co/1980x1080/1a1a1a/ffffff.png',
    },
    badge: {
        type: [String],
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    likes:{
        type: Number,
        default: 1,
    },
    views:{
        type: Number,
        default: 1,
    },
    source: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.startsWith('https://github.com');
            },
            message: 'Enter valid URL'
        }
    },
    demo: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.startsWith('http://') || value.startsWith('https://');
            },
            message: 'Enter a valid demo URL'
        }

    },
    overview: {
        type: {
            Title: {type: String},
            Description: {type: String},
        },
        required: true
    },
    helpedBy: {
        type: [
            {
                Title: {type: String},
                Subtitle: {type: [String]},
            }
        ],
        default: []
    },
    keyFeature: {
        type: [
            {
                Title: {type: String},
                Subtitle: {type: String},
                KeyPoints: {type: [String]},
            }
        ],
    },
    screenShot: {
        type: [
            {
                Title: {type: String},
                Description: {type: String},
                ImageUrl: {type: String},
            }
        ]
    },
    techStack: {
        type: [
            {
                Title: {type: String},
                Technologies: {type: [String]},
            }
        ]
    },
    projectStatus: {
        type: {
            Status: {
                type: String,
                enum: ['currently working', 'completed'],
                required: true,
            },
            StartAt: {
                type: Date,
                required: true,
                validate: {
                    validator: function (value) {
                        return value < new Date();
                    },
                    message: 'Invalid Start At',
                }
            },
            EndAt: {
                type: Date,
                required: false,
                default: null
            }
        }
    },
    clientDetails: {
        type:{
            Title: {
                type: String,
                required: true
            },
            Heading: {
                type: String,
                required: true
            },
            Location: {
                type: String,
                required: true
            },
            Description: {
                type: String,
                required: true
            },
            ImageLocation: {
                type: String,
                default: ""
            },
        }
    },
    otherProjects: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Project',
        validate: {
            validator: async function (value) {
                const count = await mongoose.model('Project').countDocuments({ _id: { $in: value } });
                return count === value.length;
            },
            message: 'Enter Valid Projects '
        }
    }

}, {timestamps: true});

projectSchema.pre('save', function (next) {
    if (!this.title.startsWith("Harsh Raithatha - ")) {
        this.title = `Harsh Raithatha - ${this.title}`;
    }
    next();
})

module.exports = mongoose.model('Project', projectSchema);
