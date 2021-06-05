require('dotenv').config('../.env')
const Pusher = require("pusher");

module.exports =  {
   pushVote : (count) => {
    const push = new Pusher({
      appId: process.env.PUSHER_appId,
      key: process.env.PUSHER_key,
      secret: process.env.PUSHER_secret,
      cluster: process.env.PUSHER_cluster,
      useTLS: true
    });
    push.trigger('DinnerDeciderDemo', 'addVote', {count})
  }
}