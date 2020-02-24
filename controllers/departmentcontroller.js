const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
// var Departments = require('../models/departments');
const Departments  = require('../models').Departments;

module.exports={
    getallDepartments,
    addDepartment,
    updateDepartment,
    getallDepartmentsBy
};
async function getallDepartments(req, res){
    console.log('here now..');
    const depts =await Departments.findAll();
    if(depts){
        res.send(_.map(depts,_.partialRight(_.pick, ['id','Name','Code'])));
    }
    else{res.status(404).send("No department was found...");}
}
async function getallDepartmentsBy(req, res){
    var id=req.params.facultyId;
    const depts =await Departments.findAll({FactultyId:id});
    if(depts){
        res.send(_.map(depts,_.partialRight(_.pick, ['id','Name','Code'])));
    }
    else{res.status(404).send("No department was found...");}
}
async function addDepartment(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let dept = await Departments.findOne({
        where: {
            Name: req.body.Name,
            Code:req.body.Code
        }
    });
    // console.log(role);
    if (dept) return res.status(400).send("Department with similar description already exists");
    let department = new Departments(_.pick(req.body, ['Name', 'Code']));
    const today = new Date();
    department.updatedAt = today.getDate();
    await department.save();
    res.send(_.pick(department, ['id', 'Code', 'Name']));
}
async function updateDepartment(req, res){
   // var id=req.params.id;
   const {id}=req.body;
    let dept = await Departments.findByPk(id);
    // console.log(role);
    if (dept) {
    const today = new Date();
    const {Code,Name,FacultyId}=req.body;
    dept.Code=Code;
    dept.Name=Name;
    dept.FacultyId=FacultyId;
    dept.updatedAt = today.getDate();
    await dept.save();
    res.send(_.pick(dept, ['id', 'Code', 'Name','FacultyId']));
    } else{
        return res.status(400).send("department with the given id not found...");
    }
}
function validate(req) {
	const schema = {
        Name: Joi.string().required(),
        Code: Joi.string().required(),
        FacultyId:Joi.number()
	};
	return Joi.validate(req, schema);
}
 