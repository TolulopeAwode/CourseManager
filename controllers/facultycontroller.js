const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize=require('sequelize');
// var Departments = require('../models/departments');
const FacultyContext  = require('../models').Faculty;

module.exports={
    getallFaculties,
    addFaculty,
    getallFacultiesInCollege,
    updateFaculty
};
async function getallFaculties(req, res){
    const fac =await FacultyContext.findAll();
    if(fac){
        res.send(_.map(fac,_.partialRight(_.pick, ['id','Name','Code'])));
    }
    else{res.status(404).send("No Faculyt was found...");}
}
async function getallFacultiesInCollege(req, res){
    var id=req.params.collegeId;
    const fac =await FacultyContext.findAll({CollegeId:id});
    if(depts){
        res.send(_.map(fac,_.partialRight(_.pick, ['id','Name','Code'])));
    }
    else{res.status(404).send("No faculty was found...");}
}
async function addFaculty(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let fac = await FacultyContext.findOne({
        where: { [sequelize.Op.or]: [
            {Name: req.body.Name},
            {Code:req.body.Code}
        ]
    }
    });
    // console.log(role);
    if (fac) return res.status(400).send("Faculty with similar name or code already exists");
    let faculty = new FacultyContext(_.pick(req.body, ['Name', 'Code','CollegeId']));
    const today = new Date().getDate();
    faculty.updatedAt = today;
    faculty.createdAt = today;
    await faculty.save();
    res.send(_.pick(faculty, ['id', 'Code', 'Name']));
}
async function updateFaculty(req, res){
   // var id=req.params.id;
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   let fac = await FacultyContext.findByPk(req.body.id);
   // console.log(role);
   if (!fac) return res.status(400).send("Faculty information not found");
   const today = new Date().getDate();
   fac.updatedAt = today;
   fac.createdAt = today;
   fac.CollegeId=req.body.CollegeId;
   fac.Name=req.body.Name;
   fac.Code=req.body.Code;
   await fac.save();
   res.send(_.pick(faculty, ['id', 'Code', 'Name','CollegeId']));
}
function validate(req) {
	const schema = {
        Name: Joi.string().required(),
        Code: Joi.string().required(),
        CollegeId:Joi.number()
	};
	return Joi.validate(req, schema);
}
 