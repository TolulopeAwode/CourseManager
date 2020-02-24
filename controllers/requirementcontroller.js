const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize=require('sequelize');
// var Departments = require('../models/departments');
const RequirementContext  = require('../models').Requirement;
const ProgrammeLevelContext  = require('../models').Programmelevel;
const RequirementTypeContext  = require('../models').RequirementType;
const SemesterContext  = require('../models').Semester;


module.exports={
    getRequirements,
    addRequirement
};
async function getRequirements(req, res){
    const reqId = req.params.reqId;
    const requird =await RequirementContext.findAll({where: {RequirementTypeId:reqId}});
    if(requird){
        res.send(_.map(requird,_.partialRight(_.pick, ['id','Description','MaximumUnit','MinimumUnit','RequirementTypeId'])));
    }
    else{res.status(404).send("Requirement not found...");}
}
async function addRequirement(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let requird = await RequirementContext.findOne({
        where: { 
            [sequelize.Op.and]:[ 
            {SemId: req.body.SemId},
            {ProgrammeLevId: req.body.ProgrammeLevId},
            {RequirementTypeId: req.body.RequirementTypeId},
            ]
    }
    });
    // console.log(role);

    const progLev = await ProgrammeLevelContext.findByPk(req.body.ProgrammeLevId);
    if(!progLev) return res.status(404).send('Programme Level configuration is missing..');
    const semester = await SemesterContext.findByPk(req.body.SemId);
    if(!semester)return res.status(404).send('Semester has not been configured');
    const requirementType =await RequirementTypeContext.findByPk(req.body.RequirementTypeId);
    if(!requirementType) return res.status(404).send('Requirement Type not yet configured...');
    if (requird) return res.status(400).send("Requirement with similar description...");
    let rq = new RequirementContext(_.pick(req.body, ['MaximumUnit','MinimumUnit','SemId','ProgrammeLevId','RequirementTypeId']));
    const today = new Date();
    rq.updatedAt = today;
    rq.Description= progLev.Description + ' '+ semester.Description+'('+requirementType.Description+')';    rq.isActive = true;
    rq.createdAt = today;
    await rq.save();
    res.send(_.pick(rq, ['id', 'Description','MaximumUnit','MinimumUnit','SemId','ProgrammeLevId','RequirementTypeId']));
}
function validate(req) {
	const schema = {
        MaximumUnit:Joi.number().required(),
        MinimumUnit:Joi.number().required(),
        RequirementTypeId:Joi.number().required(),
        SemId:Joi.number().required(),
        ProgrammeLevId: Joi.number().required()
	};
	return Joi.validate(req, schema);
}
 