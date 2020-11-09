var express = require('express');
var router = express.Router();
const userAuth = require('../middleware/user');

var controller = require('../controllers/authController');

router.post('/check', userAuth, controller.check)

router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router;