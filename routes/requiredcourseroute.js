const express = require('express');
const router = express.Router();

const reqCourseRoute = require('../controllers/requiredcoursecontroller');
//router.get('/getall',levelRoute.getallLevel) ;
router.post('/add',reqCourseRoute.addRequiredCourses) ;
//router.post('/update',levelRoute.updateLevel) ;
module.exports = router;



