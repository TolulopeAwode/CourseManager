const Joi = require("joi");
const _ = require("lodash");
const url = require("url");
const sequelize = require("sequelize");
// var Departments = require('../models/departments');
const LevelContext = require("../models").Level;
const ProgrammeContext = require("../models").Programme;
const ProgrammeLevelContext = require("../models").Programmelevel;

module.exports = {
	updateProgrammeLevel,
	addProgrameLevel,
    getallProgrammeLevel,
    getallProgrammeLevelByLevel,
    getallProgrammeLevelByProgramme
};
async function getallProgrammeLevel(req, res) {
	const progLevel = await ProgrammeLevels.findAll();
	if (progLevel) {
		res.send(
			_.map(
				progLevel,
                _.partialRight(_.pick, ['id', 'Description', 'LevelId', 'programmeId','isactive'])
			)
		);
	} else {
		res.status(404).send("No Programme Level was found...");
	}
}
async function getallProgrammeLevelByLevel(req, res) {
 var levId=req.params.levelId;
	const progLevel = await ProgrammeLevels.findAll({
        where:{
            LevelId:levId
        }
    });
	if (progLevel) {
		res.send(
			_.map(
				progLevel,
				_.partialRight(_.pick, ['id', 'Description', 'LevelId', 'programmeId','isactive'])
			)
		);
	} else {
		res.status(404).send("No Programme Level was found...");
	}
}
async function getallProgrammeLevelByProgramme(req, res) {
    var programmeId=req.params.programmeId;
       const progLevel = await ProgrammeLevels.findAll({
           where:{
               programmeId:programmeId
           }
       });
       if (progLevel) {
           res.send(
               _.map(
                   progLevel,
                   _.partialRight(_.pick, ['id', 'Description', 'LevelId', 'programmeId','isactive'])
               )
           );
       } else {
           res.status(404).send("No Programme Level was found...");
       }
   }
async function addProgrameLevel(req, res) {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	let proglevel = await ProgrammeLevelContext.findOne({
		where: {
			[sequelize.Op.and]: [
				{
					LevelId: req.body.LevelId
				},
				{
					programmeId: req.body.programmeId
				}
			]
		}
	});
	// console.log(role);
	if (proglevel) {
		return res.status(400).send("This configuration already exists");
	} else {
		let lev = await LevelContext.findByPk(req.body.LevelId);
		if (lev) {
			const prog = await ProgrammeContext.findByPk(req.body.programmeId);
			if (prog) {
				const progDescription = lev.Description + " " + prog.ProgrammeName;
				let levProg = new ProgrammeLevelContext(
					_.pick(req.body, ["programmeId", "LevelId"])
				);
                const today = new Date().getDate();
                levProg.programmeId=prog.id;
                levProg.LevelId=lev.id;
				levProg.updatedAt = today;
				levProg.createdAt = today;
				levProg.Description = progDescription;
				levProg.isactive = true;

				await levProg.save();
				res.send(_.pick(levProg, ['id', 'Description', 'LevelId', 'programmeId','isactive']));
			} else {
				res.status(400).send("Invalid programme detail");
			}
		} else {
			res.status(400).send("Unable to retrieve level with the given id");
		}
	}
}
async function updateProgrammeLevel(req, res) {
    const {id,LevelId,programmeId,isactive}=req.body;
    // let proglevel = await ProgrammeLevelContext.findOne({
	// 	where: {
	// 		[sequelize.Op.and]: [
	// 			{
	// 				LevelId: LevelId
	// 			},
	// 			{
	// 				programmeId: programmeId
	// 			}
	// 		]
	// 	}
    // });
    let proglevel = await ProgrammeLevelContext.findByPk(id);
		
	// console.log(role);
	if (!proglevel) {
		return res.status(400).send("Unable to retrieve configurations");
	} else {
		let lev = new LevelContext.findByPk(LevelId);
		if (lev) {
			const prog = await ProgrammeContext.findByPk(programmeId);
			if (prog) {
				const progDescription = lev.Description + " " + prog.ProgrammeName;
				let levProg = new ProgrammeLevelContext(
					_.pick(programmeId, LevelId)
				);
				const today = new Date();
				levProg.updatedAt = today.getDate();
				levProg.Description = progDescription;
				levProg.isactive = isactive;

				await levProg.save();
				res.send(_.pick(levProg, ['id', 'Description', 'LevelId', 'programmeId','isactive']));
			} else {
				res.status(400).send("Invalid programme detail");
			}
		} else {
			res.status(400).send("Unable to retrieve level with the given id");
		}
	}
}
function validate(req) {
	const schema = {
        LevelId: Joi.number().required(),
        programmeId: Joi.number().required()
	};
	return Joi.validate(req, schema);
}
