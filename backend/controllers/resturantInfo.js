require('dotenv').config({ path: __dirname + '/.env' })
const fetch = require('node-fetch')
const pusher = require('../config/pusher')
const Polls = require('../models/Polls')
const Votes = require('../models/Votes')

module.exports = {
    getResturant: async (req, res) => {
        try {
            console.log(req.body)
        } catch (error) {
            console.log(error)
        }
    },

    postZip: async (req, res) => {
        try {
            const zip = req.body.zip
            console.log(
                '🚀 ~ file: resturantInfo.js ~ line 19 ~ postZip: ~ zip',
                zip
            )
            const poll = await Polls.create({
                author: req.user.id,
                address: zip
            })
            console.log(
                '🚀 ~ file: resturantInfo.js ~ line 18 ~ postZip:async ~ poll',
                poll
            )
            res.json({ id: poll._id })
        } catch (error) {
            console.log(error)
        }
    },

    createNewPoll: async (req, res) => {
        try {
            const zip = req.body.zip
            const name = req.body.name
            console.log(
                '🚀 ~ file: resturantInfo.js ~ line 41 ~ createNewPoll: ~ name',
                name
            )
            console.log(
                '🚀 ~ file: resturantInfo.js ~ line 19 ~ postZip: ~ zip',
                zip
            )
            const poll = await Polls.create({
                author: req.user.id,
                name,
                address: zip
            })
            console.log(
                '🚀 ~ file: resturantInfo.js ~ line 18 ~ postZip:async ~ poll',
                poll
            )
            res.json({ name, id: poll._id, address: zip })
        } catch (error) {
            console.log(error)
        }
    },

    getVotercount: async (req, res) => {
        try {
            const pollId = req.params.id
            const poll = await Polls.findById({ _id: pollId })
            console.log(
                '🚀 ~ file: resturantInfo.js ~ line 125 ~ getVotercount: ~ poll',
                poll
            )
            const count = poll.voters.length || 0
            res.json({ count })
        } catch (error) {
            console.log(error)
        }
    }
}
