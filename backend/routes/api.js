const express = require('express')
const router = express.Router()
const voteRoutes = require('./voteRoutes')
const detailsController = require('../controllers/resturantInfo')
const resultsRoutes = require('./resultsRoutes')
const pollRoutes = require('./pollRoutes')

router.get('/resturant', detailsController.getResturant)
router.post('/address', detailsController.postZip)
router.post('/createNewPoll', detailsController.createNewPoll)
router.use('/Vote', voteRoutes)
router.use('/Results', resultsRoutes)
router.use('/Poll', pollRoutes)
router.get('/Callvote/:id', detailsController.getVotercount)

module.exports = router
