const express = require('express')
const router = express.Router()
const poll = require('../controllers/pollController')

router.get('/getPolls', poll.getPolls)
router.post('/createNewPoll', poll.createNewPoll)
router.get('/Results/count/:id', poll.getCategoryCounts)
router.get('/Results/:id', poll.getResult)
router.get('/Results', poll.getResults)
router.delete('/Delete/:id', poll.deletePoll)

module.exports = router
