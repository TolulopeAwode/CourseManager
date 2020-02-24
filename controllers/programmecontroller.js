
const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize = require('sequelize');
const ProgrammeContext  = require('../models').Programme;
const AwardContext =require('../models').Award;

module.exports={
    addProgramme,
    getAllProgrammes,
    getProgrammesInDept,
    updateProgramme,
    getProgrammesByAward
};
async function getAllProgrammes(req, res){
   
    const programmes =await ProgrammeContext.findAll();
    if(programmes){
        res.send(_.map(programmes,_.partialRight(_.pick, ['id','ProgrammeCode','ProgrammeName','IsActive','DepartmentId','AwardId'])));
    }
    else{res.status(404).send("No Programme was found...");}
}
async function getProgrammesInDept(req, res){
    var id=req.params.DepartmentId;
    const programmes =await ProgrammeContext.findAll({DepartmentId:id});
    if(programmes){
        res.send(_.map(course,_.partialRight(_.pick, ['id','ProgrammeCode','ProgrammeName','IsActive','AwardId'])));
    }
    else{res.status(404).send("No Programme was found...");}
}
async function getProgrammesByAward(req, res){
    var id=req.params.AwardId;
    const programmes =await ProgrammeContext.findAll({AwardId:id});
    if(programmes){
        res.send(_.map(course,_.partialRight(_.pick, ['id','ProgrammeCode','ProgrammeName','IsActive','DepartmentId'])));
    }
    else{res.status(404).send("No Programme was found...");}
}

async function addProgramme(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let programmes = await ProgrammeContext.findOne({
        where: {
            [sequelize.Op.and]: [ // Using sequelize.Op or Sequelize.Op interchangeably
              {
                //ProgrammeName:req.body.ProgrammeName
                AwardId:req.body.AwardId
              },
              {
                //ProgrammeCode: req.body.ProgrammeCode
                DepartmentId:req.body.DepartmentId
                
              }
            ]
          }
        }
    );
    // console.log(role);
    
    const awrd =await AwardContext.findByPk(req.body.AwardId);
    if(awrd){
        const progName=req.body.ProgrammeName+'('+awrd.AwardAcronym+')';
        console.log('Programme Name', progName);
    if (programmes) return res.status(400).send("Programme with similar parameter already exists");
    let prog = new ProgrammeContext(_.pick(req.body, ['ProgrammeCode', 'ProgrammeName','DepartmentId','AwardId']));
    const today = new Date();
    prog.updatedAt = today.getDate();
    prog.createdAt = today.getDate();
    prog.ProgrammeName=progName;
    prog.IsActive=true;
    await prog.save();
    res.send(_.pick(prog, ['id', 'ProgrammeCode', 'ProgrammeName','IsActive','DepartmentId','AwardId']));
}else{
    return res.status(400).send('Unable to retrieve award..');
}

}
async function updateProgramme(req, res){
   // var id=req.params.id;
   const {id}=req.body;
    let programme = await ProgrammeContext.findByPk(id);
    // console.log(role);
    if (programme) {
    const today = new Date();
    const {ProgrammeCode,ProgrammeName,DepartmentId,IsActive,AwardId}=req.body;
    programme.ProgrammeCode=ProgrammeCode;
    programme.ProgrammeName=ProgrammeName;
    programme.DepartmentId=DepartmentId;
    programme.AwardId=AwardId
    programme.IsActive=IsActive;
    programme.updatedAt = today.getDate();
    await programme.save();
    res.send(_.pick(programme, ['id', 'ProgrammeCode', 'ProgrammeName','DepartmentId','IsActive']));
    } else{
        return res.status(400).send("Programme with the given id not found...");
    }
}
function validate(req) {
	const schema = {
        ProgrammeName: Joi.string().required(),
        ProgrammeCode: Joi.string().required(),
        DepartmentId: Joi.number().required(),
        AwardId:Joi.number().required()
	};
	return Joi.validate(req, schema);
}