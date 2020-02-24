const express = require('express');
const router = express.Router();

const departmentRoute = require('../controllers/departmentcontroller');
router.get('/getall',departmentRoute.getallDepartments) ;
router.post('/add',departmentRoute.addDepartment) ;
router.post('/update',departmentRoute.updateDepartment) ;
router.get('/getall/:facultyId',departmentRoute.getallDepartmentsBy) ;
module.exports = router;



