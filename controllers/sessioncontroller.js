const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize=require('sequelize');
// var Departments = require('../models/departments');
const SessionContext  = require('../models').Session;

module.exports={
    getAllSessions,
    addSession
};
async function getAllSessions(req, res){
    const session =await SessionContext.findAll();
    if(session){
        res.send(_.map(session,_.partialRight(_.pick, ['id','Description'])));
    }
    else{res.status(404).send("Session not found...");}
}
async function addSession(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let session = await SessionContext.findOne({
        where: { 
            Description: req.body.Description
    }
    });
    // console.log(role);
    if (session) return res.status(400).send("Session with similar description...");
    let sess = new SessionContext(_.pick(req.body, ['Description']));
    const today = new Date();
    sess.updatedAt = today;
    sess.isActive = true;
    sess.createdAt = today;
    await sess.save();
    res.send(_.pick(sess, ['id', 'Description']));
}
function validate(req) {
	const schema = {
        Description: Joi.string().required()
	};
	return Joi.validate(req, schema);
}
 