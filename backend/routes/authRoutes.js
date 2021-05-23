const express = require('express')
const passport = require('passport')
const config = require('../config/config')
const router = express.Router()
const azureRoutes = require('./signInRoutes/azure')
const localRoutes = require('./signInRoutes/local')

router.use('/azure', azureRoutes)
router.use('/local', localRoutes)

module.exports = router
