const express = require('express');
const router = express.Router();

const sessionRoute = require('../controllers/sessioncontroller');
router.get('/getall',sessionRoute.getAllSessions) ;
router.post('/add',sessionRoute.addSession) ;
module.exports = router;



