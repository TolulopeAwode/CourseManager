const express = require('express');
const router = express.Router();

const awardLevelRoute = require('../controllers/awardlevelcontroller');
router.post('/add',awardLevelRoute.addAwardLevel) ;
router.post('/update',awardLevelRoute.updateAwardLevel) ;
router.get('/getall',awardLevelRoute.getallAwardLevel) ;
router.get('/getallByLevel/:LevelId',awardLevelRoute.getallAwardLevelByLevel) ;
router.get('/getallByAward/:awardId',awardLevelRoute.getallAwardLevelByAward) ;
module.exports = router;


