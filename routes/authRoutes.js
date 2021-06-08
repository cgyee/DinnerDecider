const express = require('express')
const passport = require('passport')
const config = require('../config/config')
const router = express.Router()
const azureRoutes = require('./signInRoutes/azure')
const localRoutes = require('./signInRoutes/local')

router.use('/azure', azureRoutes)
router.use('/local', localRoutes)
router.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy((err) => {
        if (err)
            console.log(
                'Error : Failed to destroy the session during logout.',
                err
            )
        req.user = null
        res.redirect('/')
    })
})

module.exports = router
