const Joi = require("joi");
const _ = require("lodash");
const url = require("url");
const AwardLevelContext = require("../models").AwardLevel;
const AwardContext = require("../models").Award;
const LevelContext = require("../models").Level;

// #################
module.exports = {
    addAwardLevel,
    updateAwardLevel,
    getallAwardLevelByAward,
    getallAwardLevel,
    getallAwardLevelByLevel
};
async function addAwardLevel(req, res) {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const { AwardId, LevelId } = req.body;
	//isactive

	let awardLev = await AwardLevelContext.findOne({
		where: {
			AwardId: AwardId,
			LevelId: LevelId
		}
	});
	if(awardLev){
		return res.status(400).send("Similar configuration already exists..");
	}
	else{
	let award = await AwardContext.findByPk(AwardId);
	//  console.log(award.AwardAcronym);
	if (award) {
		let level = await LevelContext.findByPk(LevelId);
		if (level) {
			const description = level.Description+	'('+award.AwardAcronym+')';
			console.log('Award ID',award.id);
			let awLev = new AwardLevelContext(_.pick(req.body, ['AwardId', 'LevelId']));
		    // awLev.AwardId = award.id;
		    // awLev.LevelId = level.id;
			awLev.isactive = true;
			awLev.Description = description;
			const today = new Date();
			awLev.updatedAt = today.getDate();
			awLev.createdAt = today.getDate();
			await awLev.save();
			res.send(_.pick(awLev, ["id", "Description"]));
		} else {
			return res.status(400).send("Level Not found");
			//  return res.status(400).send(error.details[0].message);
		}
	} else {
		return res.status(400).send("Award Not found");
	}
}
}

async function getallAwardLevel(req, res) {
	const awards = await AwardLevelContext.findAll({});
	if (awards) {
		res.send(_.map(awards, _.partialRight(_.pick, ["id", "Description"])));
	} else {
		res.status(404).send("No Award was found...");
	}
}
async function getallAwardLevelByLevel(req, res) {
    const LevelId =req.params.LevelId;
	const awards = await AwardLevelContext.findAll({LevelId:LevelId});
	if (awards) {
		res.send(_.map(awards, _.partialRight(_.pick, ["id", "Description"])));
	} else {
		res.status(404).send("No Award was found...");
	}
}
async function getallAwardLevelByAward(req, res) {
    const AwardId =req.params.AwardId;
	const awards = await AwardLevelContext.findAll({LevelId:LevelId});
	if (awards) {
		res.send(_.map(awards, _.partialRight(_.pick, ["id", "Description"])));
	} else {
		res.status(404).send("No Award was found...");
	}
}

async function updateAwardLevel(req, res) {
	// var id=req.params.id;
	const { id, AwardId, LevelId } = req.body;
	let awardLev = await AwardLevelContext.findByPk(id);
	// console.log(role);
	if (awardLev) {
		const today = new Date();
		let award = await AwardContext.findByPk(AwardId);
		if (award) {
			let level = await LevelContext.findByPk(LevelId);
			if (level) {
				const description = level.Description+'('+award.AwardAcronym+')'			
				awardLev.AwardId = AwardId;
				awardLev.LevelId = LevelId;
				awardLev.updatedAt = today.getDate();
				awardLev.Description = description;
				await awardLev.save();
				res.send(_.pick(awardLev, ["id", "Description"]));
			} else {
			
				return res.status(400).send("Level with the given id not found...");
			}
		} else {
			return res.status(400).send("Award with the given id not found...");
		}
	} else {
        return res.status(400)
        .send("Award Level with the given id not found...");
		
	}
}
function validate(req) {
	const schema = {
		LevelId: Joi.number().required(),
		AwardId: Joi.number().required()
	};
	return Joi.validate(req, schema);
}
