const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize=require('sequelize');
// var Departments = require('../models/departments');
const StudentContext  = require('../models').Student;
const StudentLevelContext  = require('../models').StudentLevel;
const ProgrammeContext  = require('../models').Programmelevel;
const SessionContext  = require('../models').Session;

module.exports={
    addStudent,
    getStudent
};
async function getStudent(req, res){
    const matricno = req.params.matricno;
    const student =await StudentContext.findOne({where :{MatricNo:matricno}});
    if(!student) res.status(404).send("Student not found...");
    const session =await SessionContext.findOne({where:{isActive:true}});
    if(!session) res.status(400).send('No active session found..');
    const studentLevel = await StudentLevelContext.findOne(
        {where: {[sequelize.Op.and]: [ {StudentId:student.id},
        {SessId:session.id0}
    ]}
    });
      res.send({
          MatricNo:student.MatricNo,
          Surname:student.Surname,
          FirstName:student.FirstName,
          Gender: student.Gender,
          Avatar: student.Avatar,
          Address:student.Address,
          PhoneNo:student.PhoneNo,
          EmailAddress:student.EmailAddress,
          StudentLevelId:studentLevel.id,
          Level:studentLevel.Description

      });
   
}
async function addStudent(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const stud =await StudentContext.findOne({where :{MatricNo:req.body.MatricNo}});
    if(stud) res.status(404).send("Student already profiled.");
    const session =await SessionContext.findOne({where:{isActive:true}});
    if(!session) res.status(400).send('No active session found..');
    const programmeLevel = await ProgrammeContext.findByPk(req.body.ProgrammeLevId);
       if(!programmeLevel) return res.status(400).send('Programme Configuration not found...');   
    if (!session) return res.status(400).send("Session not found description...");
    let student = new StudentContext(_.pick(req.body, ['MatricNo','Surname','FirstName',
    'Gender','Avatar','Address','EmailAddress','ProgrammeLevId','PhoneNo']));
    const today = new Date();
    student.updatedAt = today;
    student.isActive = true;
    student.createdAt = today;
    await student.save();
    let studentLevel = new StudentLevelContext({StudentId:student.id,SessId:session.id,ProgrammeLevId:req.body.ProgrammeLevId,isActive:true})
   await studentLevel.save();
    res.send({
        MatricNo:student.MatricNo,
        Surname:student.Surname,
        FirstName:student.FirstName,
        Gender: student.Gender,
        Avatar: student.Avatar,
        Address:student.Address,
        PhoneNo:student.PhoneNo,
        EmailAddress:student.EmailAddress,
        StudentLevelId:studentLevel.id,
        Level:studentLevel.Description

    });
function validate(req) {
	const schema = {
        MatricNo: Joi.string().required(),
        Surname: Joi.string().required(),
        FirstName: Joi.string().required(),
        Gender: Joi.string().required(),
        Avatar: Joi.string().required(),
        PhoneNo:Joi.string().required(),
        Address: Joi.string().required(),
        EmailAddress: Joi.string().required(),
        ProgrammeLevId: Joi.number().required()
	};
	return Joi.validate(req, schema);
}
}