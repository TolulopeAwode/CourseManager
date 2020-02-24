const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize=require('sequelize');
// var Departments = require('../models/departments');
const SemesterContext  = require('../models').Semester;

module.exports={
    getAllSemesters,
    addSemester
};
async function getAllSemesters(req, res){
    const fac =await SemesterContext.findAll();
    if(fac){
        res.send(_.map(fac,_.partialRight(_.pick, ['id','Description'])));
    }
    else{res.status(404).send("Semester not found...");}
}
async function addSemester(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let semester = await SemesterContext.findOne({
        where: { 
            Description: req.body.Description
    }
    });
    // console.log(role);
    if (semester) return res.status(400).send("Semester with similar description...");
    let sem = new SemesterContext(_.pick(req.body, ['Description']));
    const today = new Date();
    sem.updatedAt = today;
    sem.isActive = true;
    sem.createdAt = today;
    await sem.save();
    res.send(_.pick(sem, ['id', 'Description']));
}
function validate(req) {
	const schema = {
        Description: Joi.string().required()
	};
	return Joi.validate(req, schema);
}
 