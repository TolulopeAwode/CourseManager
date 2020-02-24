const express = require('express');
const router = express.Router();

const awardRoute = require('../controllers/awardcontroller');
router.get('/getall',awardRoute.getallAwards);
router.post('/add',awardRoute.addAward) ;
router.post('/update',awardRoute.updateAward) ;
module.exports = router;


