const express = require('express');
const router = express.Router();

const programmeLevelRoute = require('../controllers/programmelevelcontroller');
router.get('/getall',programmeLevelRoute.getallProgrammeLevel) ;
router.post('/add',programmeLevelRoute.addProgrameLevel) ;
router.post('/update',programmeLevelRoute.updateProgrammeLevel) ;
router.get('/getallByLevel/:levelId',programmeLevelRoute.getallProgrammeLevelByLevel) ;
router.get('/getallByprogramme/:programmeId',programmeLevelRoute.getallProgrammeLevelByProgramme) ;
module.exports = router;