const mongoose = require('mongoose')

const PollSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    address: {
        type:String,
        required: true
    },
    voters: {
        type: [String],
        default:[]
    },
    winningrResult: {
        type: String
    }
})

module.exports = mongoose.model('Polls', PollSchema)