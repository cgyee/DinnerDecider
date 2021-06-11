const express = require('express')
const router = express.Router()
const localController = require('../../controllers/signInControllers/local')

/* Routes for /local to control logging in/out with a username and password */
router.get('/login', localController.getLogin)
router.post('/login', localController.postLogin)
router.get('/logout', localController.logout)
router.post('/signup', localController.postSignup)

module.exports = router
