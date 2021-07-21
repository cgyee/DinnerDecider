/* import Models */
const Polls = require('../models/Polls')
const Votes = require('../models/Votes')

/* 3rd Party API that uses websockets to publish events for the client */
const pusher = require('../config/pusher')

module.exports = {
    /* Return the poll that matches the id in the request params */
    getPollbyId: (req, res) => {
        try {
            /*  */
            const pollId = req.params.id
            res.json({ id: pollId })
        } catch (error) {
            console.log(error)
        }
    },

    getPollCount: async (req, res) => {
        try {
            const pollId = req.params.id
            const votes = Votes.find({ pollId })
            const count = votes.length || 0
            console.log(
                '🚀 ~ file: voteController.js ~ line 25 ~ getPollCount: ~ count',
                count
            )
            res.send({ count })
        } catch (error) {
            console.log(error)
        }
    },

    /* PUT - Update a Poll Model with the Vote id of a new vote */
    putPollEntry: async (req, res) => {
        try {
            /* Poll id is sent in req params */
            const pollId = req.params.id
            /* Values to used in voting comes in the form of {label, value} */
            const selectedValuesObject = req.body.categories
            let categories = []

            /* Iterating over object and pushing the value in categories */
            for (let index in selectedValuesObject) {
                categories.push(selectedValuesObject[index].value)
            }

            /* Creating a new Vote based on the pollId(an alias for Poll._id) categories and  */
            const vote = await Votes.create({ pollId, categories })
            /* Result of Vote is used to update Poll with the matching Poll._id with the value Vote._id  */
            const poll = await Polls.findByIdAndUpdate(
                { _id: pollId },
                { $push: { voters: vote._id } }
            )

            /* 
                The code below is used by pusher to update the client as to the number of voters
                We add one beacuse poll's information is from the update and thefore the count is behind by one 
            */
            const count = poll.voters.length + 1
            pusher.pushVote(count)
            /* Send a 200(OK) response and the categories */
            res.status(200).send(categories)
        } catch (error) {
            console.log(error)
        }
    }
}
