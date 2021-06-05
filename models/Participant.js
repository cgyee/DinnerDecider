const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const PartcipantSchema = new mongoose.Schema({
    uid: {
        type:String,
        default: "guest"
    },
    pollId: {
        type:ObjectId,
        require: true
    },
    categories: {
        type:[Object]
    }
})