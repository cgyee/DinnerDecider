const express = require('express')
const router = express.Router()
const detailsController = require('../controllers/resturantInfo')

router.get('/resturant', detailsController.getResturant)

module.exports = router