const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const AdmissionContext  = require('../models').Admission;
const SessionContext  = require('../models').Session;

module.exports={
    addAdmission,
    getallAdmission
};
async function addAdmission(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    let admission = await AdmissionContext.findOne({
        where: {
            Description: req.body.Description
        }
    });
    // console.log(role);
    if (admission) return res.status(400).send("admission with similar description already exists");
     admission= new AdmissionContext(_.pick(req.body, ['Description', 'SessId','AdmissionCode']));
    
    const today = new Date();
    admission.updatedAt = today;
    await admission.save();
    res.send(_.pick(admission, ['id', 'Description', 'SessId']));
}

async function getallAdmission(req, res){
    const session =await SessionContext.findOne({where:{isActive:true}});
    if(!session) return res.status(400).send('Session not configured...');
    const admission =await AdmissionContext.findAll({where:{SessId:session.id}});
    if(admission){
        res.send(_.map(admission,_.partialRight(_.pick, ['id','Description','SessId','AdmissionCode'])));
    }
    else{res.status(404).send("Admission not configured...");}
}



function validate(req) {
    const schema = {
        Description: Joi.string().min(3).required(),
        SessId:Joi.number().required(),
        AdmissionCode:Joi.string().required()
    };
    return Joi.validate(req, schema);
}