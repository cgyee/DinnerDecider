require('dotenv').config({path:__dirname+'/.env'})
moongose = require('mongoose')
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
            const selectedValuesObject =  req.body.categories
            let categories = []

            for(let index in selectedValuesObject) {
                categories.push(selectedValuesObject[index].value)
            }

            const vote = await Votes.create({pollId, categories})
            const poll = await Polls.findByIdAndUpdate({_id:pollId}, {$push: {voters:pollId}})
            const count = poll.voters.length
            pusher.pushVote(count)

            res.json({id:"working"})
        } catch (error) {
            console.log(error)
        }
    },
    getResult: async(req, res) => {
        try {
            const pollId = req.params.id
            const votes = await Votes.find({pollId})
            const poll = await Polls.findById({_id:pollId})
            const address = poll.address
            
            let votesArray =[]
            let voteCounts = {}
            votes.forEach(vote => {
                votesArray = [...votesArray, ...vote.categories]
            })

            let max = 0
            let category;
            
            votesArray.forEach(vote => {
                if(!(vote in voteCounts)) {
                    voteCounts[vote] = 0
                }
                voteCounts[vote]+=1
                if(voteCounts[vote] > max) {
                    category = vote
                    max = voteCounts[vote]
                }
            })

            const myHeader = {'Authorization':`Bearer ${process.env.YELP_API_KEY}`}
            const requestOptions = {
               method: 'GET',
               headers:myHeader,
               redirect:'follow' 
            }
            const response =  await  fetch(`https://api.yelp.com/v3/businesses/search?location=${address}&categories=${category}&sort_by=rating`, requestOptions)
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
            console.log("🚀 ~ file: resturantInfo.js ~ line 103 ~ getResult:async ~ location", location)
            res.json({name, image_url, country, display_address, rating, phone, review_count})
        
        } catch (error) {
            console.log(error)
        }
    }
}