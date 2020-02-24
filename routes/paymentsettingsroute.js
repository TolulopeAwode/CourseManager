const express = require('express');
const router = express.Router();

const paymentsettingRoute = require('../controllers/paymentsettingcontroller');
router.get('/getall',paymentsettingRoute.getAllPaymentSettings) ;
router.post('/add',paymentsettingRoute.addPaymentSetting) ;
router.get('/get/:payinfo',paymentsettingRoute.getOnePaymentSetting) ;
// router.post('/update',levelRoute.updateLevel) ;
module.exports = router;



