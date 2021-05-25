const mongoose = require('mongoose')

const MSUserSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    microsoftId: { type: String, unique: true }

})

module.exports = mongoose.model('MSUSer', MSUserSchema)