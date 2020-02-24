const express = require('express');
const router = express.Router();

const programmeRoute = require('../controllers/programmecontroller');
router.get('/getall',programmeRoute.getAllProgrammes) ;
router.post('/add',programmeRoute.addProgramme) ;
router.post('/update',programmeRoute.updateProgramme) ;
router.get('/getallByDept/:DepartmentId',programmeRoute.getProgrammesInDept) ;
router.get('/getallByAward/:AwardId',programmeRoute.getProgrammesInDept) ;
module.exports = router;