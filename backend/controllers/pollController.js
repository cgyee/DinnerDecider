require('dotenv').config({ path: __dirname + '/.env' })
const fetch = require('node-fetch')
const pusher = require('../config/pusher')
const Polls = require('../models/Polls')
const Votes = require('../models/Votes')

module.exports = {
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
                address: zip,
                winningResult: { o: 'poop' }
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
    getPolls: async (req, res) => {
        try {
            const author = req.user.id
            const polls = await Polls.find({ author })
            console.log(
                '🚀 ~ file: pollController.js ~ line 38 ~ getPolls: ~ polls',
                polls
            )
            res.send({ polls })
        } catch (error) {
            console.log(
                '🚀 ~ file: pollController.js ~ line 38 ~ getPolls: ~ error',
                error
            )
        }
    },
    getResult: async (req, res) => {
        try {
            const pollId = req.params.id
            const votes = await Votes.find({ pollId })
            const poll = await Polls.findById({ _id: pollId })
            const address = poll.address
            const pollName = poll.name

            let votesArray = []
            let voteCounts = {}
            votes.forEach((vote) => {
                votesArray.push(vote.categories)
            })
            let max = -1
            let category

            votesArray.forEach((vote) => {
                if (!(vote in voteCounts)) {
                    voteCounts[vote] = 0
                }
                voteCounts[vote] += 1
                if (voteCounts[vote] > max) {
                    category = vote
                    max = voteCounts[vote]
                }
            })

            const myHeader = {
                Authorization: `Bearer ${process.env.YELP_API_KEY}`
            }
            const requestOptions = {
                method: 'GET',
                headers: myHeader,
                redirect: 'follow'
            }
            const response = await fetch(
                `https://api.yelp.com/v3/businesses/search?location=${address}&categories=${category}&sort_by=rating`,
                requestOptions
            )
            const data = await response.json()
            const resturant = data.businesses[0]
            const {
                name,
                image_url,
                location,
                rating,
                phone,
                review_count,
                url
            } = resturant
            const {
                address1,
                address2,
                address3,
                city,
                country,
                state,
                display_address
            } = location

            const winResult = {
                _id: pollId,
                pollName,
                name,
                image_url,
                rating,
                phone,
                review_count,
                display_address
            }

            const result = await Polls.findOneAndUpdate(
                { _id: pollId },
                { $set: { winResult } }
            )

            res.json({ ...winResult })
        } catch (error) {
            console.log(error)
        }
    },
    getResults: async (req, res) => {
        const author = req.user.id
        console.log(
            '🚀 ~ file: pollController.js ~ line 148 ~ getResults: ~ author',
            author
        )
        const polls = await Polls.find({ author })
        const completedPolls = polls.filter((poll) => poll.isComplete)
        console.log(
            '🚀 ~ file: pollController.js ~ line 150 ~ getResults:async ~ completedPolls',
            completedPolls
        )
        const winningResults = completedPolls.map((poll) => poll.winResult)
        res.send({ polls: winningResults })
    },
    deletePoll: async (req, res) => {
        const author = req.user.id
        const id = req.params.id

        const poll = await Polls.deleteOne({ author, _id: id })
        console.log(
            '🚀 ~ file: pollController.js ~ line 163 ~ deletePoll ~ poll',
            poll
        )
        res.sendStatus(200)
    }
}
