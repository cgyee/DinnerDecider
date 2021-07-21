require('dotenv').config({ path: __dirname + '/.env' })
/* library to make fetch request in a similar was JS web env fetch */
const fetch = require('node-fetch')
/* Required Models */
const Polls = require('../models/Polls')
const Votes = require('../models/Votes')
/* 3rd Party service that used websockets to publish events for the client dynamically */
const pusher = require('../config/pusher')

const aggregateResults = (votes) => {
    /* Create variable to hold all voted categories and object to hold their count */
    let votesArray = []
    let voteCounts = {}

    /* Iterate over the votes and use the spread operator on vote.categories and push those values into votesArray */
    votes.forEach((vote) => {
        votesArray.push(...vote.categories)
    })

    /* Set a minimum value for the category with the most votes and intialize a variable to hold the cateogory */
    let max = -1
    let category

    /* Iterate over the votesArray to find the winning category */
    votesArray.forEach((vote) => {
        /* If a vote is not in the voteCounts object create a new property based on that and initalize its value to 1 */
        if (!(vote in voteCounts)) {
            voteCounts[vote] = 0
        }
        /* Increment the value of voteCounts with the property of vote  */
        voteCounts[vote] += 1
        /* If the value voteCounts of vote is greater than the current max value set category equal to the vote value and max equal to voteCounts of vote */
        if (voteCounts[vote] > max) {
            category = vote
            max = voteCounts[vote]
        }
    })
    return category
}

const fetchYelpBusiness = async (address, category, pollName, pollId) => {
    /* Yelp API uses token-bearer authorization this is configuring the value */
    const myHeader = {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }

    /* Settting options for Yelp API */
    const requestOptions = {
        method: 'GET',
        headers: myHeader,
        redirect: 'follow'
    }

    /* Fetching resturant info from Yelp API based on address provided in Poll.address and category that created above */
    const response = await fetch(
        `https://api.yelp.com/v3/businesses/search?location=${address}&categories=${category}&sort_by=rating`,
        requestOptions
    )

    /* Yelp API return an array of resturnats in data.businesses, we want the first resturant in the list others don't matter to use at the moment */
    const data = await response.json()
    const resturant = data.businesses[0]

    /* We use object destucting to get the properties we're interested in from the resturant object */
    const {
        name,
        image_url,
        location,
        rating,
        phone,
        review_count,
        url
    } = resturant

    /* We use object destucting to get the properties we're interested in from the nested location object */
    const {
        address1,
        address2,
        address3,
        city,
        country,
        state,
        display_address
    } = location

    /* Create a new object based on Polls.winResult, information related to the winning result & category stored inside*/
    const winResult = {
        _id: pollId,
        pollName,
        name,
        image_url,
        rating,
        phone,
        review_count,
        display_address,
        category
    }

    /* Find a Poll with the associated id and update/set the value of winResult  */
    const result = await Polls.findOneAndUpdate(
        { _id: pollId },
        { $set: { winResult } }
    )

    return winResult
}

module.exports = {
    /* POST - Create new Poll based on req.body props */
    createNewPoll: async (req, res) => {
        try {
            /* Get properties from req.body and use to create new Poll */
            const zip = req.body.zip
            const name = req.body.name
            const poll = await Polls.create({
                author: req.user.id,
                name,
                address: zip,
                winningResult: { o: 'poop' }
            })
            /* If new poll is created return the name, Poll._id, and zip */
            res.json({ name, id: poll._id, address: zip })
        } catch (error) {
            console.log(error)
        }
    },

    /* GET - Find poll by author using req.user.id */
    getPolls: async (req, res) => {
        try {
            /* Create varible named author based on req.user.id  and use it find all Polls assocaited with that id  */
            const author = req.user.id
            const polls = await Polls.find({ author })

            /* Return all associated Polls as a response  */
            res.send({ polls })
        } catch (error) {
            console.log(
                '🚀 ~ file: pollController.js ~ line 38 ~ getPolls: ~ error',
                error
            )
        }
    },

    /* GET - Aggregate all Votes associated with a Poll to determine the winning category and return a resturant info as a response */
    getResult: async (req, res) => {
        try {
            /* Get Poll._id from request params */
            const pollId = req.params.id
            /* Find all Votes and the Poll associated with Poll._id  */
            const votes = await Votes.find({ pollId })
            const poll = await Polls.findById({ _id: pollId })
            let { winResult } = poll

            if (winResult) {
                console.log(
                    '🚀 ~ file: pollController.js ~ line 155 ~ getResult: ~ poll.winResult',
                    poll
                )
                res.json({ ...poll.winResult })
                return
            }

            /* address is used as a filter for Yelp API request later */
            const address = poll.address
            const pollName = poll.name
            const category = aggregateResults(votes)
            winResult = await fetchYelpBusiness(
                address,
                category,
                pollName,
                pollId
            )

            /* Return a json response of destructered winResult */
            res.json({ ...winResult })
        } catch (error) {
            console.log(error)
        }
    },

    /* GET - Find all completed Polls associated with the user  */
    getResults: async (req, res) => {
        /* Create a variable called author an alias for User._id, using req.user.id */
        const author = req.user.id
        /* Find all Polls associated with author */
        const polls = await Polls.find({ author })

        /* Could be reafactored to user isComplete filter in above find */
        /* Use filter array method and poll.isCompleted as check  */
        const completedPolls = polls.filter((poll) => poll.isComplete)
        /* Return a new array with only information related to winResult */
        const winningResults = completedPolls.map((poll) => poll.winResult)
        /* Return json response of Polls winResults */
        res.send({ polls: winningResults })
    },

    /* DELETE - Removes Poll with the associated Poll._id and author(User._id) */
    deletePoll: async (req, res) => {
        try {
            const author = req.user.id
            const id = req.params.id
            const poll = await Polls.deleteOne({ author, _id: id })
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
        }
    }
}
