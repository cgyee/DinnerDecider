const express = require('express')
const router = express.Router()
const registrationController = require('../controllers/registrationController');

router.use(express.urlencoded({ extended: true }))

router.get('/', registrationController.getRoot);
router.post('/new_user', registrationController.createNewUser);

module.exports = router;

