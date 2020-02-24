'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    CourseTitle: DataTypes.STRING,
    CourseCode: DataTypes.STRING,
    CoverURL: DataTypes.STRING
  }, {});
  Course.associate = function(models) {
    Course.hasMany(models.Courseobjective, {
      foreignKey:'CourseId'
    });
    Course.hasMany(models.RequiredCourse, {
      foreignKey:'CourseId'
    });
  };
  return Course;
};