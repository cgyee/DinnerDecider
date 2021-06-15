const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLList
} = require('graphql')
const GraphQLDate = require('graphql-date')
const Polls = require('../models/Polls')

/* Definition of type that mirrors Poll model */
const pollType = new GraphQLObjectType({
    name: 'Poll',
    fields: () => ({
        _id: { type: GraphQLID },
        author: { type: GraphQLString },
        name: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        voters: {
            type: new GraphQLList(GraphQLString)
        },
        isComplete: {
            type: GraphQLBoolean
        },
        winResult: {
            type: winResultType
        },
        created: {
            type: GraphQLDate
        }
    })
})

/* Definition of type that mirrors winResult field in Poll Model */
const winResultType = new GraphQLObjectType({
    name: 'WinResult',
    fields: () => ({
        _id: { type: GraphQLID },
        pollName: { type: GraphQLString },
        name: { type: GraphQLString },
        image_url: { type: GraphQLString },
        rating: { type: GraphQLString },
        phone: { type: GraphQLString },
        review_count: { type: GraphQLString },
        display_address: { type: new GraphQLList(GraphQLString) },
        category: { type: GraphQLString }
    })
})

/* Definition of type to run queries based on pollType */
const pollQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getAllPolls: {
            type: new GraphQLList(pollType),
            resolve: async () => {
                const polls = await Polls.find({})
                return polls
            }
        },
        getWinningResults: {
            type: new GraphQLList(winResultType),
            resolve: async () => {
                const isComplete = true
                const polls = await Polls.find({ isComplete }, '-_id winResult')
                return polls
            }
        },
        getMyPolls: {
            type: new GraphQLList(pollType),
            args: {
                id: { type: GraphQLString }
            },
            resolve: async (_, { id }) => {
                const author = id
                const polls = await Polls.find({ author })
                return polls
            }
        }
    })
})

module.exports = { pollQueryType }
