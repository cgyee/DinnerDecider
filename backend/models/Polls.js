const mongoose = require('mongoose')

const PollSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    voters: {
        type: [String],
        default: []
    },
    winningrResult: {
        type: Object
    },
    isComplete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Polls', PollSchema)
