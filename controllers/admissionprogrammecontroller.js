const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize =require('sequelize');
const AdmissionProgrammeContext  = require('../models').AdmissionProgramme;
const ProgrammeLevelContext  = require('../models').Programmelevel;

module.exports={
    addAdmissionProgramme,
    getAdmissions
};
async function addAdmissionProgramme(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    let admission = await AdmissionProgrammeContext.findOne({
        where: {
            [sequelize.Op.and]:[
            {AdmissionId: req.body.AdmissionId},
            {ProgrammeLevId:req.body.ProgrammeLevId}
            ]
        }
    });
    const progLevel =await ProgrammeLevelContext.findByPk(req.body.ProgrammeLevId);
    if(!progLevel) return res.status(400).send('Programme Level not found...');
    // console.log(role);
    if (admission) return res.status(400).send("admission with similar config already exists");
     admission= new AdmissionProgrammeContext(_.pick(req.body, ['AdmissionId','ProgrammeLevId']));
    
    const today = new Date();
    admission.Description =progLevel.Description;
    admission.updatedAt = today;
    admission.isActive=true;
    await admission.save();
    res.send(_.pick(admission, ['id', 'Description', 'AdmissionId','ProgrammeLevId']));
}

async function getAdmissions(req, res){
 
    const admission =await AdmissionProgrammeContext.findAll({where:{SessId:session.id}});
    if(admission){
        res.send(_.map(admission,_.partialRight(_.pick, ['id','Description','AdmissionId','ProgrammeLevId'])));
    }
    else{res.status(404).send("Admission not configured...");}
}



function validate(req) {
    const schema = {
        AdmissionId: Joi.number().required(),
        ProgrammeLevId:Joi.number().required()
    };
    return Joi.validate(req, schema);
}