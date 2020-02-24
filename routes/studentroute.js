const express = require('express');
const router = express.Router();

const studentRoute = require('../controllers/studentcontroller');
router.get('/get/:matricno',studentRoute.getStudent) ;
router.post('/add',studentRoute.addStudent) ;
module.exports = router;



