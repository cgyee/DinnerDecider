const express = require('express')
const router = express.Router()
const voteController = require('../controllers/voteController')

router.get('/:id', voteController.getPollbyId)
router.put('/:id', voteController.putPollEntry)
module.exports = router