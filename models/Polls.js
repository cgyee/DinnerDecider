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
    winResult: {
        type: Object,
        default: {}
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Polls', PollSchema)
