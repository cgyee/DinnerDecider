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
            // const poll = await Polls.create({
            //     author:"admin",
            //     address:"33071",
            // })
            // console.log("🚀 ~ file: resturantInfo.js ~ line 18 ~ postZip:async ~ poll", poll)
            // res.json({'id':poll._id})
            res.json({id:'60975a4c5341cb46e183a591'})
        } catch (error) {
            console.log(error)
        }
    },

    putPollEntry: async(req, res) => {
        try {
            const pollId =  req.params.id
            const categories =  req.body.categories
            const pollEntry = await Polls.updateOne({_id:pollId}, {$push: {'categories': categories}} )
            console.log("🚀 ~ file: resturantInfo.js ~ line 41 ~ putPollEntry:async ~ pollEntry", pollEntry)
            res.json({id:pollId})
        } catch (error) {
            console.log(error)
        }
    }
}