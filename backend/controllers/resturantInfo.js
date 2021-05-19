require('dotenv').config({path:__dirname+'/.env'})
moongose = require('mongoose')
const fetch = require('node-fetch')
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
            console.log("🚀 ~ file: resturantInfo.js ~ line 40 ~ putPollEntry:async ~ selectedValuesObject", selectedValuesObject)
            let categories = []

            for(let index in selectedValuesObject) {
                categories.push(selectedValuesObject[index].value)
            }

            console.log("🚀 ~ file: resturantInfo.js ~ line 48 ~ putPollEntry:async ~ categories", categories)
            const vote = await Votes.create({pollId, categories})
            console.log("🚀 ~ file: resturantInfo.js ~ line 50 ~ putPollEntry:async ~ vote", vote)

            res.json({id:"working"})
        } catch (error) {
            console.log(error)
        }
    },
    getResult: async(req, res) => {
        try {
            const pollId = req.params.id
            const votes = await Votes.find({pollId})
            console.log("🚀 ~ file: resturantInfo.js ~ line 63 ~ getResult:async ~ votes", votes)
        
        } catch (error) {
            console.log(error)
        }
    }
}