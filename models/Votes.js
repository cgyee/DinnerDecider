const mongoose = require('mongoose')

const VotesSchema = new mongoose.Schema({
    categories: {
        type:[ String ],
        required: true
    },
    pollId : {
        type:String,
        required:true
    },
    submitTime: {
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Votes', VotesSchema)
