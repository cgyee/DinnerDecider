const express = require('express')
const router = express.Router()
const resultsController = require('../controllers/resultsController')

router.get('/:id', resultsController.getResult)

module.exports = router