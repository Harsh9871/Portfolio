const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    bgImage: {
        type: String,
        default: 'https://placehold.co/1980x1080/1a1a1a/ffffff.png'
    },
    badge: {
        type: [String],
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 1
    },
    source: {
        type: String,
        required: true,
        validate: {
            validator: value => value.startsWith('https://github.com'),
            message: 'Enter valid URL'
        }
    },
    demo: {
        type: String,
        required: true,
        validate: {
            validator: value => value.startsWith('http://') || value.startsWith('https://'),
            message: 'Enter a valid demo URL'
        }
    },
    overview: {
        type: {
            Title: {
                type: String,
                required: true,
            },
            Description: {
                type: String,
                required: true,
            },
        },
        required: true,
        _id: false
    },
    helpedBy: {
        type: [
            {
                Title: {
                    type: String,
                    required: true,
                },
                Subtitle: {
                    type: [String],
                    required: true,
                },
                _id: false
            }
        ],
        default: []
    },
    keyFeature: {
        type: [
            {
                Title: {
                    type: String,
                    required: true
                },
                Subtitle: {
                    type: String,
                    required: true
                },
                KeyPoints: {
                    type: [String],
                    required: true
                },
                _id: false
            }
        ],
        required: true
    },
    screenShot: {
        type: [
            {
                Title: {
                    type: String
                },
                Description: {
                    type: String
                },
                ImageUrl: {
                    type: String
                },
                _id: false
            }
        ]
    },
    techStack: {
        type: [
            {
                Title: {
                    type: String
                },
                Technologies: {
                    type: [String]
                },
                _id: false
            }
        ]
    },
    projectStatus: {
        type: {
            Status: {
                type: String,
                enum: ['currently working', 'completed'],
                required: true
            },
            StartAt: {
                type: Date,
                required: true,
                validate: {
                    validator: value => value < new Date(),
                    message: 'Invalid Start At'
                }
            },
            EndAt: {
                type: Date,
                default: null
            }
        },
        _id: false
    },
    clientDetails: {
        type: {
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
            }
        },
        _id: false
    },
    otherProjects: {
        type: [String],
        required: true
    }

}, {timestamps: true});

projectSchema.pre('save', function (next) {
    if (!this.title.startsWith("Harsh Raithatha - ")) {
        this.title = `Harsh Raithatha - ${this.title}`;
    }
    next();
});

module.exports = mongoose.model('Project', projectSchema);