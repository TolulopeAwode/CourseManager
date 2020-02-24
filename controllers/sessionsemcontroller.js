const Joi = require("joi");
const _ = require("lodash");
const url = require("url");
const sequelize = require("sequelize");
// var Departments = require('../models/departments');
const SessionSemContext = require("../models").SessionSemester;
const SemesterContext = require("../models").Semester;
const SessionContext = require("../models").Session;

module.exports = {
	getCurrentSessionSem,
	getSessionSems,
	addSessionSem
};
async function getCurrentSessionSem(req, res) {
	const session = await SessionSemContext.findOne({
		where: { isActive: true }
	});
	if (session) {
     //   console.log('Sesssiooooooo',session);
		const sess = {
			id: session.id,
			Description: session.Description,
			SemId: session.SemId,
			SessId: session.SessId
		};
		res.send(sess);
	} else {
		res.status(404).send("SessionSem not found...");
	}
}
async function getSessionSems(req, res) {
	const session = await SessionSemContext.findAll();
	if (session) {
		res.send(
			_.map(
				session,
				_.partialRight(_.pick, ["id", "Description", "SemId", "SessId"])
			)
		);
	} else {
		res.status(404).send("SessionSem  not found...");
	}
}
async function addSessionSem(req, res) {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	let session = await SessionContext.findByPk(req.body.SessId);
	if (!session) return res.status(404).send("Session not configured...");
	let semester = await SemesterContext.findByPk(req.body.SemId);
	if (!semester) return res.status(404).send("Semester not configured...");
	// console.log(role);
	let sessionSem = await SessionSemContext.findOne({
		where: {
			[sequelize.Op.and]: [
				{ SemId: req.body.SemId },
				{ SessId: req.body.SessId }
			]
		}
	});
	if (sessionSem)
		return res.status(400).send("SessionSem with similar description...");
	let sessSem = new SessionSemContext(_.pick(req.body, ["SessId", "SemId"]));
	const today = new Date();
	sessSem.updatedAt = today;
	sessSem.isActive = true;
	sessSem.createdAt = today;
	sessSem.Description = session.Description + "(" + semester.Description + ")";
	await sessSem.save();
	res.send(_.pick(sessSem, ["id", "Description", "SessId", "SemId"]));
}
function validate(req) {
	const schema = {
		SemId: Joi.number().required(),
		SessId: Joi.number().required()
	};
	return Joi.validate(req, schema);
}
