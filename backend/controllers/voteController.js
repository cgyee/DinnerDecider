const Polls = require('../models/Polls')
const Votes = require('../models/Votes')
const pusher = require('../config/pusher')

module.exports = {
    getPollbyId: (req, res) => {
        try {
            const pollId = req.params.id
            console.log(
                '🚀 ~ file: resturantInfo.js ~ line 14 ~ pollId',
                pollId
            )
            res.json({ id: pollId })
        } catch (error) {
            console.log(error)
        }
    },

    putPollEntry: async (req, res) => {
        try {
            const pollId = req.params.id
            const selectedValuesObject = req.body.categories
            let categories = []

            for (let index in selectedValuesObject) {
                categories.push(selectedValuesObject[index].value)
            }

            const vote = await Votes.create({ pollId, categories })
            const poll = await Polls.findByIdAndUpdate(
                { _id: pollId },
                { $push: { voters: pollId }, $set: { isComplete: true } }
            )
            const count = poll.voters.length + 1
            console.log(
                '🚀 ~ file: resturantInfo.js ~ line 53 ~ putPollEntry:async ~ poll.voters.length',
                poll.voters.length
            )
            pusher.pushVote(count)
            res.status(200).send(categories)
        } catch (error) {
            console.log(error)
        }
    }
}
