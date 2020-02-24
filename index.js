'use strict';

const express = require('express');
const departmentRoute = require('./routes/departmentroute');
const awardRoute = require('./routes/awardroute');
const awardLevelRoute = require('./routes/awardlevelroute');
const levelRoute = require('./routes/levelroute');
const courseRoute = require('./routes/courseroute');
const programmeRoute = require('./routes/programmeroute');
const programmeLevelRoute = require('./routes/programmelevelroute');
const semesterRoute = require('./routes/semesterroute');
const facultyRoute = require('./routes/facultyroute');
const sessionRoute = require('./routes/sessionroute');
const reqTypeRoute = require('./routes/requirementtyperoute');
const sessionsemRoute = require('./routes/sessionsemroute');
const requirementRoute = require('./routes/requirementroute');
const requiredCourseRoute = require('./routes/requiredcourseroute');
const studentRoute = require('./routes/studentroute');
const admissionRoute = require('./routes/admissionroute');
const admissionProgrammeRoute =require('./routes/admissionprogroute');
const stepRoute =require('./routes/steproute');
const applicantRoute =require('./routes/applicantroute');
const paymentsettingRoute =require('./routes/paymentsettingsroute');
const app = express();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
  app.options('*', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});


app.use(express.json());
app.use('/departments', departmentRoute);
app.use('/awards', awardRoute);
app.use('/levels', levelRoute);
app.use('/courses', courseRoute);
app.use('/programmes', programmeRoute);
app.use('/faculty', facultyRoute);
app.use('/awardlev', awardLevelRoute);
app.use('/programmelev', programmeLevelRoute);
app.use('/semesters', semesterRoute);
app.use('/sessions', sessionRoute);
app.use('/reqtype', reqTypeRoute);
app.use('/sessionsem', sessionsemRoute);
app.use('/courseconfig', requiredCourseRoute);
app.use('/requirement', requirementRoute);
app.use('/students', studentRoute);
app.use('/admissions', admissionRoute);
app.use('/admissionprog',admissionProgrammeRoute);
app.use('/applicants',applicantRoute);
app.use('/paymentsetting',paymentsettingRoute);
app.use('/steps',stepRoute);
require('./startup/prod')(app);
var models= require("./models");
models.sequelize.sync().then(c=>{
  console.log('Database connection looks good');
}).catch(err=>{console.log(err);})
app.listen(2222,err=>{
   console.log(err);

 });
module.exports=app;