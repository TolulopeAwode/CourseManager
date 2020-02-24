'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const departmentRoute = require('../routes/departmentroute');
const express = require('express');
const app = express();

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const db = {
 
  Departments: sequelize.import('./departments'),
  Award: sequelize.import('./award'),
  // Faculty: sequelize.import('./faculty'),
  Level: sequelize.import('./level'),
  Programme: sequelize.import('./programme'),
  Programmelevel: sequelize.import('./programmelevel'),
  Course: sequelize.import('./course'),
  CourseObjective: sequelize.import('./courseobjective'),
  Faculty:sequelize.import('./faculty'),
  College:sequelize.import('./college'),
  Semester: sequelize.import('./semester'),
  Session: sequelize.import('./session'),
  SessionSemester: sequelize.import('./sessionsemester'),
  RequirementType: sequelize.import('./requirementtype'),
  Requirement: sequelize.import('./requirement'),
  RequiredCourse: sequelize.import('./requiredcourse'),
  PaymentSetting: sequelize.import('./paymentsetting'),
  Student: sequelize.import('./student'),
  StudentLevel: sequelize.import('./studentlevel'),
  CourseRegistration: sequelize.import('./courseregistration'),
  PaymentConfig: sequelize.import('./paymentconfig'),
  StudentPayment: sequelize.import('./studentpayment'),
  Admission: sequelize.import('./admission'),
  AdmissionProgramme: sequelize.import('./admissionprogramme'),
  Applicant: sequelize.import('./applicant'),
  Step: sequelize.import('./step'),
  Application: sequelize.import('./application'),
  ApplicationStep: sequelize.import('./applicationstep'),
  AwardLevel: sequelize.import('./awardlevel')

};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
