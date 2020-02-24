const Joi= require("joi");
const _ = require('lodash');
const url = require('url');

const CourseContext  = require('../models').Course;

module.exports={
    updateCourse,
    getCoursesInDept,
    getallCourses,
    addCourse
};
async function getallCourses(req, res){
   
    const course =await CourseContext.findAll();
    if(course){
        res.send(_.map(course,_.partialRight(_.pick, ['id','CourseCode','CourseTitle','DepartmentId'])));
    }
    else{res.status(404).send("No Course was found...");}
}
async function getCoursesInDept(req, res){
    var id=req.params.DepartmentId;
    const course =await CourseContext.findAll({DepartmentId:id});
    if(course){
        res.send(_.map(course,_.partialRight(_.pick, ['id','CourseCode','CourseTitle'])));
    }
    else{res.status(404).send("No Course was found...");}
}

async function addCourse(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let course = await CourseContext.findOne({
        or: [
            {CourseCode: req.body.CourseCode},
            {CourseTitle:req.body.CourseTitle}
        ]
    });
    // console.log(role);
    if (course) return res.status(400).send("Course with similar description already exists");
    let crs = new CourseContext(_.pick(req.body, ['CourseCode', 'CourseTitle','DepartmentId']));
    const today = new Date();
    crs.updatedAt = today.getDate();
    crs.createdAt = today.getDate();
    await crs.save();
    res.send(_.pick(crs, ['id', 'CourseCode', 'CourseTitle']));
}
async function updateCourse(req, res){
   // var id=req.params.id;
   const {id}=req.body;
    let course = await CourseContext.findByPk(id);
    // console.log(role);
    if (course) {
    const today = new Date();
    const {CourseCode,CourseTitle,DepartmentId}=req.body;
    course.CourseCode=CourseCode;
    course.CourseTitle=CourseTitle;
    course.DepartmentId=DepartmentId;
    course.updatedAt = today.getDate();
    await course.save();
    res.send(_.pick(course, ['id', 'CourseCode', 'CourseTitle','DepartmentId']));
    } else{
        return res.status(400).send("Course with the given id not found...");
    }
}
function validate(req) {
	const schema = {
        CourseTitle: Joi.string().required(),
        CourseCode: Joi.string().required(),
        DepartmentId:Joi.number().required()
	};
	return Joi.validate(req, schema);
}