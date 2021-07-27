require('dotenv').config('../.env')
const Pusher = require('pusher')

const push = new Pusher({
    appId: process.env.PUSHER_appId,
    key: process.env.PUSHER_key,
    secret: process.env.PUSHER_secret,
    cluster: process.env.PUSHER_cluster,
    useTLS: true
})

module.exports = {
    pushVote: (pollId, count) => {
        push.trigger('DinnerDeciderDemo', `addVote-${pollId}`, { count })
    },
    endVote: (pollId) => {
        push.trigger('DinnerDeciderDemo', `endVote-${pollId}`, { pollId })
    }
}
