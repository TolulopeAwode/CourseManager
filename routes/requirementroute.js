const express = require('express');
const router = express.Router();

const requirementRoute = require('../controllers/requirementcontroller');
router.get('/get/:reqId',requirementRoute.getRequirements) ;
router.post('/add',requirementRoute.addRequirement) ;
module.exports = router;



