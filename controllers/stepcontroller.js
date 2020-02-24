const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const StepContext  = require('../models').Step;

module.exports={
    addStep,
    getallSteps
};
async function addStep(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    let step = await StepContext.findOne({
        where: {
            Description: req.body.Description
        }
    });
    // console.log(role);
    if (step) return res.status(400).send("step with similar description already exists");
    step= new StepContext(_.pick(req.body, ['Description']));
    
    const today = new Date();
    step.updatedAt = today;
    step.createdAt=today;
    await step.save();
    res.send(_.pick(step, ['id', 'Description']));
}

async function getallSteps(req, res){
  
    const steps =await StepContext.findAll();
    if(steps){
        res.send(_.map(steps,_.partialRight(_.pick, ['id','Description'])));
    }
    else{res.status(404).send("step not configured...");}
}



function validate(req) {
    const schema = {
        Description: Joi.string().min(3).required()
    
    };
    return Joi.validate(req, schema);
}