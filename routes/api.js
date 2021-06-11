const express = require('express')
const router = express.Router()

/* Various routes dependent on user action  */
const voteRoutes = require('./voteRoutes')
// const resultsRoutes = require('./resultsRoutes')
const pollRoutes = require('./pollRoutes')

/* Route handlers for associated routes */
router.use('/Vote', voteRoutes)
router.use('/Poll', pollRoutes)

module.exports = router
