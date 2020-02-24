const express = require('express');
const router = express.Router();

const facultyRoute = require('../controllers/facultycontroller');
router.get('/getall/:CollegeId',facultyRoute.getallFacultiesInCollege) ;
router.get('/getall',facultyRoute.getallFaculties) ;
router.post('/add',facultyRoute.addFaculty) ;
router.post('/update',facultyRoute.updateFaculty) ;
module.exports = router;



