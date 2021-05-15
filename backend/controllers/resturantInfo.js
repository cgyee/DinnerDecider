moongose = require('mongoose')
const Polls = require('../models/Polls')

module.exports = {
    getResturant: async (req, res) => {
        try {
            console.log(req.body)
        } catch (error) {
            console.log(error)
        }
    },

    getPollId: (req, res) => {
        try {
            const pollId = req.params.id 
            console.log("🚀 ~ file: resturantInfo.js ~ line 14 ~ pollId", pollId)
            res.json({id:pollId})
        } catch (error) {
            console.log(error)
        }
    },

    postZip: async(req, res) => {
        try {
            const poll = await Polls.create({
                author:"admin",
                address:"33071",
            })
            console.log("🚀 ~ file: resturantInfo.js ~ line 18 ~ postZip:async ~ poll", poll)
            res.json({'id':poll._id})
        } catch (error) {
            console.log(error)
        }
    },

    putPollEntry: async(req, res) => {
        try {
            const pollId =  req.params.id
            const categories =  req.body.categories
            console.log("🚀 ~ file: resturantInfo.js ~ line 40 ~ putPollEntry:async ~ categories", categories)
            // const pollEntry = await Polls.findByIdAndUpdate({_id:pollId}, {$push: {'participants': values}})
            const poll = await Polls.findById({_id:pollId})

            const votedCategories = poll.participants
            console.log("🚀 ~ file: resturantInfo.js ~ line 44 ~ putPollEntry:async ~ votedCategories", votedCategories)
            let updateParticipants = {}

            res.json({id:"test"})
        } catch (error) {
            console.log(error)
        }
    }
}