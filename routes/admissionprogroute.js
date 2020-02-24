const express = require('express');
const router = express.Router();

const admissionProgrammeRoute = require('../controllers/admissionprogrammecontroller');
router.get('/getall',admissionProgrammeRoute.getAdmissions) ;
router.post('/add',admissionProgrammeRoute.addAdmissionProgramme) ;
// router.post('/update',levelRoute.updateLevel) ;
module.exports = router;



