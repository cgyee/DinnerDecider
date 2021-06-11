const express = require('express')
const passport = require('passport')
const config = require('../config/config')
const router = express.Router()
/* Import for routes based on passport strategies */
const azureRoutes = require('./signInRoutes/azure')
const localRoutes = require('./signInRoutes/local')

/* Adding routes to router middleware */
router.use('/azure', azureRoutes)
router.use('/local', localRoutes)

/* All strategies use the same logout endpoint  */
router.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy((err) => {
        if (err)
            console.log(
                'Error : Failed to destroy the session during logout.',
                err
            )
        req.user = null
        res.sendStatus(200)
    })
})

module.exports = router
