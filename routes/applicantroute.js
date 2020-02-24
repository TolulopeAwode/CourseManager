const express = require('express');
const router = express.Router();

const applicantRoute = require('../controllers/applicantcontroller');
router.post('/getall',applicantRoute.LogPayment) ;
router.post('/shortprofile',applicantRoute.addShortProfile) ;
router.post('/addpayment',applicantRoute.addPaymentProfile) ;
router.post('/authenticate',applicantRoute.confirmlogin) ;
router.post('/checkpay',applicantRoute.confirmPayment) ;
// router.post('/update',levelRoute.updateLevel) ;
module.exports = router;



