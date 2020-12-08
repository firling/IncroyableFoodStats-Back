var express = require('express');
var router = express.Router();
const userAuth = require('../middleware/user');

var controller = require('../controllers/mainController');

router.post('/storeHistoric', userAuth, controller.storeHistoric);
router.get('/getUserHistoric', userAuth, controller.getUserHistoric);
router.get('/getProfiles', userAuth, controller.getProfiles);
router.get('/getSpecificUserHistoric', userAuth, controller.getSpecificUserHistoric);


router.get('/getProfilesAutorisation', userAuth, controller.getProfilesAutorisation);
router.post('/addAutorisation', userAuth, controller.addAutorisation);

module.exports = router;