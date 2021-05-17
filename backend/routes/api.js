const express = require('express')
const router = express.Router()
const detailsController = require('../controllers/resturantInfo')

router.get('/resturant', detailsController.getResturant)
router.post('/address', detailsController.postZip)
router.get('/Vote/:id', detailsController.getPollId)
router.put('/Vote/:id', detailsController.putPollEntry)
router.get('/Results/:id', detailsController.getResult)

module.exports = router