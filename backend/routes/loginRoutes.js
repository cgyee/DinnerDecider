const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

router.use(express.urlencoded({ extended: true }))

// router.get('/', loginController.getRoot);
router.post('/attempt', loginController.postLogin);

module.exports = router;