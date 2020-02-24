const express = require('express');
const router = express.Router();

const sessionSemRoute = require('../controllers/sessionsemcontroller');
router.get('/getcurrent',sessionSemRoute.getCurrentSessionSem) ;
router.get('/getall',sessionSemRoute.getSessionSems) ;
router.post('/add',sessionSemRoute.addSessionSem) ;
module.exports = router;



