const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize = require('sequelize');
const generator = require('../');
const ApplicantContext  = require('../models').Applicant;
const StepContext  = require('../models').Step;
const ApplicationStepContext  = require('../models').ApplicationStep;
const PaymentLogContext  = require('../models').PaymentSettingLog;
const PaymentSettingContext  = require('../models').PaymentSetting;
const AdmissionContext  = require('../models').Admission;

module.exports={
    addShortProfile,
    LogPayment,
    addPaymentProfile,
    confirmlogin,
    confirmPayment
};
async function confirmlogin(req, res){
   
    const applicant =await ApplicantContext.findOne({
        where: { 
            [sequelize.Op.and]:
             [
                 {LoginId:req.body.LoginId},
                 {Password:req.body.Password}
                ]}});
    if(applicant){
        res.send({id:applicant.id,Surname:applicant.Surname,FirstName:applicant.FirstName,EmailAddress:applicant.EmailAddress,LoginId:applicant.LoginId});
    }
    else{res.status(401).send("Invalid Credentials");}
}
async function confirmPayment(req, res){
    const user =req.user;
    const stp = await StepContext.findOne({where: {Description:'Payment'}});
    const paymentStep  = await ApplicationStepContext.findOne({
        where: { 
            [sequelize.Op.and]:
             [
                 {ApplicantId:user.id},
                 {StepId:stp.id}
                ]}});
    if(paymentStep){
        res.status(200).send({Status:true});
    }
    else{res.status(400).send({Status:false});}
}
async function addShortProfile(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let app = await ApplicantContext.findOne({
        where: {
            LoginId: req.body.LoginId
        }
    });
  const admission =await  AdmissionContext.findOne({where: {AdmissionCode:req.body.AdmissionCode}});
  if(!admission)  return res.status(400).send('Unable to retrieve admission information');
    // console.log(role);
    let step = await StepContext.findOne({where:{Description:'ShortProfile'}});
    if(!step) return res.status(400).send('Please configure process flow..');
    if (app) return res.status(400).send("user already exists");

     app= new ApplicantContext({LoginId:req.body.LoginId,AdmissionId:admission.id,Surname:req.body.Surname,FirstName:req.body.FirstName,EmailAddress:req.body.EmailAddress});
    const today = new Date();
    app.updatedAt = today;
    await app.save();

    let appStep=new ApplicationStepContext({StepId:step.id,ApplicantId:app.id,hasCompleted:true,Description:step.Description});
    await appStep.save();
    res.send(_.pick(app, ['id', 'Surname', 'FirstName','EmailAddress']));
}
async function LogPayment(req, res){
    let app = await ApplicantContext.findOne({
        where: {
            LoginId: req.body.LoginId
        }
    });
    let paymentDetail =await PaymentSettingContext.findOne({where:{Description:'Application'}});
    if(!paymentDetail) return res.status(404).send('Payment config not found..');
     let paymentLog = await PaymentLogContext.findOne({where:{Transactionref:req.body.Transactionref}});
    if(paymentLog) res.status(400).send('Log already created');
    paymentLog = new PaymentLogContext({PaymentId:req.body.PaymentId,ApplicantId:app.id,Transactionref:req.body.Transactionref});
    await paymentLog.save();
}
async function addPaymentProfile(req, res){
    let app = await ApplicantContext.findOne({
        where: {
            LoginId: req.body.LoginId
        }
    });
    // console.log(role);
    let step = await StepContext.findOne({where:{Description:'Payment'}});
    if(!step) return res.status(400).send('Please configure process flow..');
    if (!app) return res.status(400).send("user not found");
    
    app= new ApplicantContext(_.pick(req.body, ['LoginId', 'Transactionref']));
    const today = new Date();
    app.updatedAt = today;
    await app.save();

    let appStep=new ApplicationStepContext({StepId:step.id,ApplicantId:app.id,hasCompleted:true,Description:step.Description});
    await appStep.save();
    res.send(_.pick(app, ['id', 'Surname', 'FirstName','EmailAddress','Password']));
}
function validate(req) {
    const schema = {
        LoginId: Joi.string().min(3).required(),
        AdmissionCode:Joi.string().required(),
        Surname:Joi.string().required(),
        FirstName:Joi.string().required(),
        EmailAddress:Joi.string().required(),
        Password:Joi.string()
    };
    return Joi.validate(req, schema);
}
function validateLogin(req) {
    const schema = {
        LoginId: Joi.string().min(3).required(),
        Password:Joi.string().required()
    };
    return Joi.validate(req, schema);
}