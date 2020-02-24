const express = require('express');
const router = express.Router();

const requirementtyperoute = require('../controllers/requirementtypecontroller');
router.get('/getall',requirementtyperoute.getAllRequirementType) ;
router.post('/add',requirementtyperoute.addRequirementType) ;
module.exports = router;



