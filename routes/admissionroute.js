const express = require('express');
const router = express.Router();

const admissionRoute = require('../controllers/admissioncontroller');
router.get('/getall',admissionRoute.getallAdmission) ;
router.post('/add',admissionRoute.addAdmission) ;
// router.post('/update',levelRoute.updateLevel) ;
module.exports = router;



