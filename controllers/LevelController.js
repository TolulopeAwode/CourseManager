const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
// var Departments = require('../models/departments');
const LevelContext  = require('../models').Level;

module.exports={
    updateLevel,
    getallLevel,
    addLevel
};
async function getallLevel(req, res){
    const levels =await LevelContext.findAll();
    if(levels){
        res.send(_.map(depts,_.partialRight(_.pick, ['id','Description'])));
    }
    else{res.status(404).send("No Level was found...");}
}
async function addLevel(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let level = await LevelContext.findOne({
        where: {
            Description: req.body.Description
        }
    });
    // console.log(role);
    if (level) return res.status(400).send("Level with similar description already exists");
    let lev = new LevelContext(_.pick(req.body, ['Description']));
    const today = new Date();
    lev.updatedAt = today.getDate();
    await lev.save();
    res.send(_.pick(lev, ['id', 'Description']));
}
async function updateLevel(req, res){
   // var id=req.params.id;
   const {id,Description}=req.body;
    let level = await LevelContext.findByPk(id);
    // console.log(role);
    if (level) {
    const today = new Date();
    const {Code,Name,FacultyId}=req.body;
    level.Description=Description;
    level.updatedAt = today.getDate();
    await level.save();
    res.send(_.pick(dept, ['id', 'Description']));
    } else{
        return res.status(400).send("Level with the given id not found...");
    }
}
function validate(req) {
	const schema = {
		Description: Joi.string().required()
	};
	return Joi.validate(req, schema);
}
 