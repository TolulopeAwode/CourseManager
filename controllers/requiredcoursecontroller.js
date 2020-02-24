const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize=require('sequelize');
// var Departments = require('../models/departments');
const RequiredCourseContext  = require('../models').RequiredCourse;
const CourseContext  = require('../models').Course;

module.exports={
    addRequiredCourses
    
};

async function addRequiredCourses(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let courseReq = await RequiredCourseContext.findOne({
        where: { [sequelize.Op.and]: [
            {CourseId: req.body.CourseId},
            {RequirementId:req.body.RequirementId}
        ]
    }
    });
    const course = await CourseContext.findByPk(req.body.CourseId);
    if(!course) return res.status(404).send('Course not found..');
    // console.log(role);
    if (courseReq) return res.status(400).send("Course Configuration with similar name or code already exists");
    let reqCourse = new RequiredCourseContext(_.pick(req.body, ['CourseId', 'RequirementId','Unit']));
    const today = new Date().getDate();
    reqCourse.updatedAt = today;
    reqCourse.isActive = true;
    reqCourse.createdAt = today;
    
    await reqCourse.save();
    res.send(_.pick(reqCourse, ['id', 'RequirementId', 'CourseId']));   
}
function validate(req) {
	const schema = {
        RequirementId: Joi.number().required(),
        Unit: Joi.number().required(),
        CourseId:Joi.number()
	};
	return Joi.validate(req, schema);
}
 