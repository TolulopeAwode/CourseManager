const express = require('express');
const router = express.Router();

const courseRoute = require('../controllers/coursecontroller');
router.get('/getall',courseRoute.getallCourses) ;
router.post('/add',courseRoute.addCourse) ;
router.post('/update',courseRoute.updateCourse) ;
router.get('/getall/:DepartmentId',courseRoute.getCoursesInDept) ;
module.exports = router;



