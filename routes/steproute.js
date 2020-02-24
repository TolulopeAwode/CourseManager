const express = require('express');
const router = express.Router();

const stepRoute = require('../controllers/stepcontroller');
router.get('/getall',stepRoute.getallSteps) ;
router.post('/add',stepRoute.addStep) ;
// router.post('/update',levelRoute.updateLevel) ;
module.exports = router;



