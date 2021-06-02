const express = require('express')
const router = express.Router()
const voteRoutes = require('./voteRoutes')
const detailsController = require('../controllers/resturantInfo')
const resultsRoutes = require('./resultsRoutes')
const pollRoutes = require('./pollRoutes')

//TODO delete redundant routes and associated controllers, change update frontend with new routes
router.get('/resturant', detailsController.getResturant)
router.post('/address', detailsController.postZip)
//

router.use('/Vote', voteRoutes)
router.use('/Results', resultsRoutes)
router.use('/Poll', pollRoutes)
//TODO refactor following logic
router.get('/Callvote/:id', detailsController.getVotercount)

module.exports = router
