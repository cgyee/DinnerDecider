const express = require('express')
const router = express.Router()
const poll = require('../controllers/pollController')

router.get('/getPolls', poll.getPolls)
router.post('/createNewPoll', poll.createNewPoll)
router.get('/Results/:id', poll.getResult)
router.get('/Results', poll.getResults)

module.exports = router
