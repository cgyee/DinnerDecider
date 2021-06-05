const express = require('express')
const router = express.Router()
const localController = require('../../controllers/signInControllers/local')

router.get('/login', localController.getLogin)
router.post('/login', localController.postLogin)
router.get('/logout', localController.logout)
router.get('/signup', localController.getSignup)
router.post('/signup', localController.postSignup)

module.exports = router