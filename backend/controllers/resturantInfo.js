moongose = require('mongoose')
const { count } = require('../models/Polls')
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
            const selectedValuesObject =  req.body.categories
            console.log("🚀 ~ file: resturantInfo.js ~ line 40 ~ putPollEntry:async ~ selectedValuesObject", selectedValuesObject)
            let selectedValues = []

            for(let index in selectedValuesObject) {
                selectedValues.push(selectedValuesObject[index].value)
            }
            console.log("🚀 ~ file: resturantInfo.js ~ line 45 ~ putPollEntry:async ~ selectedValues", selectedValues)
            
            const poll = await Polls.findById({_id:pollId})
            let pollVotes = poll.votes

            if(pollVotes.length === 0) {
                selectedValues.forEach(vote => {
                    pollVotes.push({'category':vote, 'count':0})
                })
            }
            pollVotes.forEach(vote => {
                if(selectedValues.includes(vote.category)) {
                    selectedValues.splice(selectedValues.indexOf(vote.category), 1)
                    console.log("🚀 ~ file: resturantInfo.js ~ line 60 ~ putPollEntry:async ~ selectedValues", selectedValues)
                    vote.count+=1
                }
            })
            let temp = selectedValues.map(vote => {
                return {'category':vote, 'count':1}
            })

            pollVotes = [...pollVotes, ...temp]
            pollVotes.sort((vote_a, vote_b) => {
                if(vote_a.count < vote_b.count) { return -1 }
                if(vote_a.count > vote_b.count) { return 1 }
                return 0
            })
            Polls.updateOne({_id:pollId}, {votes:pollVotes})

            res.json({id:"working"})
        } catch (error) {
            console.log(error)
        }
    },
    getResult: async(req, res) => {
        try {
            const pollId = req.params.id
            const poll = await Polls.findById({_id:pollId})
            let pollVotes = poll.votes
        } catch (error) {
            console.log(error)
        }
    }
}