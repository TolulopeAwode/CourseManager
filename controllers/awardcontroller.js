const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const Awrd  = require('../models').Award;

module.exports={
addAward,
getallAwards,
updateAward
};
async function addAward(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {AwardFullName,AwardAcronym} = req.body;
    let award = await Awrd.findOne({
        where: {
            AwardFullName: AwardFullName,
            AwardAcronym: AwardAcronym
        }
    });
    // console.log(role);
    if (award) return res.status(400).send("Award with similar description already exists");
     award= new Awrd(_.pick(req.body, ['AwardAcronym', 'AwardFullName']));
    
    const today = new Date();
    award.updatedAt = today.getDate();
    await award.save();
    res.send(_.pick(award, ['id', 'AwardAcronym', 'AwardFullName']));
}

async function getallAwards(req, res){
    const awards =await Awrd.findAll();
    if(awards){
        res.send(_.map(awards,_.partialRight(_.pick, ['id','AwardAcronym','AwardFullName'])));
    }
    else{res.status(404).send("No Award was found...");}
}

async function updateAward(req, res){
    // var id=req.params.id;
    const {id}=req.body;
     let award = await Awrd.findByPk(id);
     // console.log(role);
     if (award) {
     const today = new Date();
     const {AwardAcronym,AwardFullName}=req.body;
     award.AwardAcronym=AwardAcronym;
     award.AwardFullName=AwardFullName;
     award.updatedAt = today.getDate();
     await award.save();
     res.send(_.pick(award, ['id', 'AwardAcronym', 'AwardFullName','FacultyId']));
     } else{
         return res.status(400).send("Award with the given id not found...");
     }
 }
function validate(req) {
    const schema = {
        AwardFullName: Joi.string().min(3).required(),
        AwardAcronym: Joi.string().min(3).required()
    };
    return Joi.validate(req, schema);
}