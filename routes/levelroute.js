const express = require('express');
const router = express.Router();

const levelRoute = require('../controllers/LevelController');
router.get('/getall',levelRoute.getallLevel) ;
router.post('/add',levelRoute.addLevel) ;
router.post('/update',levelRoute.updateLevel) ;
module.exports = router;



