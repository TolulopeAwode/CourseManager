const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize=require('sequelize');
// var Departments = require('../models/departments');
const PaymentSettingContext  = require('../models').PaymentSetting;

module.exports={
    getAllPaymentSettings,
    getOnePaymentSetting,
    addPaymentSetting
};
async function getAllPaymentSettings(req, res){
    const fac =await PaymentSettingContext.findAll();
    if(fac){
        res.send(_.map(fac,_.partialRight(_.pick, ['id','Description','Paymentcode'])));
    }
    else{res.status(404).send("Payment Setting Not found not found...");}
}
async function getOnePaymentSetting(req, res){
    const par =req.params.payinfo;
    const fac =await PaymentSettingContext.findOne({where:{Description:par}});
    if(fac){
        res.send({id:fac.id,Description:fac.Description,Paymentcode:fac.Paymentcode});
    }
    else{res.status(404).send("Payment Setting Not found not found...");}
}
async function addPaymentSetting(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let payment = await PaymentSettingContext.findOne({
        where: {
            Description: req.body.Description,
            Paymentcode:req.body.Paymentcode
        }
    });
    // console.log(role);
    if (payment) return res.status(400).send("payment with similar description already exists");
    let pay = new PaymentSettingContext(_.pick(req.body, ['Description', 'Paymentcode']));
    const today = new Date();
    pay.updatedAt = today;
    pay.createdAt =today;
    await pay.save();
    res.send(_.pick(pay, ['id', 'Description', 'Paymentcode']));
}
function validate(req) {
    const schema = {
        Paymentcode: Joi.string().required(),
        Description:Joi.string().required()
    };
    return Joi.validate(req, schema);
}
