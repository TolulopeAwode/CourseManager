const express = require('express');
const router = express.Router();

const semesterRoute = require('../controllers/semestercontroller');
router.get('/getall',semesterRoute.getAllSemesters) ;
router.post('/add',semesterRoute.addSemester) ;
module.exports = router;



