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
    participants: {
        type: [Object],
        default:[]
    }
})

module.exports = mongoose.model('Polls', PollSchema)