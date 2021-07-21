const express = require('express')
const router = express.Router()
/* import votecontroller to access methods */
const voteController = require('../controllers/voteController')

/* Routes return or alter poll dependant on the id in request */
router.get('/:id', voteController.getPollbyId)
router.get('/:id/count', voteController.getPollCount)
router.put('/:id', voteController.putPollEntry)
module.exports = router
