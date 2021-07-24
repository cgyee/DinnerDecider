import Pusher from 'pusher-js'
const pusher = new Pusher(process.env.REACT_APP_PUSHER_SECRET, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER
})
export default pusher
