const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize=require('sequelize');
// var Departments = require('../models/departments');
const RequirementTypeContext  = require('../models').RequirementType;

module.exports={
    getAllRequirementType,
    addRequirementType
};
async function getAllRequirementType(req, res){
    const requireType =await RequirementTypeContext.findAll();
    if(requireType){
        res.send(_.map(requireType,_.partialRight(_.pick, ['id','Description'])));
    }
    else{res.status(404).send("Requirement Type not found...");}
}
async function addRequirementType(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let requireType = await RequirementTypeContext.findOne({
        where: { 
            Description: req.body.Description
    }
    });
    // console.log(role);
    if (requireType) return res.status(400).send("Requirement Type with similar description...");
   let reqi = new RequirementTypeContext(_.pick(req.body, ['Description']));
    const today = new Date();
    reqi.updatedAt = today;
    reqi.isActive = true;
    reqi.createdAt = today;
    await reqi.save();
    res.send(_.pick(reqi, ['id', 'Description']));
}
function validate(req) {
	const schema = {
        Description: Joi.string().required()
	};
	return Joi.validate(req, schema);
}
 