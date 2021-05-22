const express = require('express')
const router = express.Router()
const voteRoutes = require('./voteRoutes')
const detailsController = require('../controllers/resturantInfo')

router.get('/resturant', detailsController.getResturant)
router.post('/address', detailsController.postZip)
router.use('/Vote', voteRoutes)
// router.get('/Vote/:id', detailsController.getPollId)
// router.put('/Vote/:id', detailsController.putPollEntry)
router.get('/Results/:id', detailsController.getResult)
router.get('/Callvote/:id', detailsController.getVotercount)

module.exports = router