const express = require('express')
const router = express.Router()
const voteRoutes = require('./voteRoutes')
const detailsController = require('../controllers/resturantInfo')
const resultsRoutes = require('./resultsRoutes')

router.get('/resturant', detailsController.getResturant)
router.post('/address', detailsController.postZip)
router.use('/Vote', voteRoutes)
router.use('/Results', resultsRoutes)
router.get('/Callvote/:id', detailsController.getVotercount)

module.exports = router