'use strict';
module.exports = (sequelize, DataTypes) => {
  const RequiredCourse = sequelize.define('RequiredCourse', {
    Unit: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {});
  RequiredCourse.associate = function(models) {
    RequiredCourse.hasMany(models.CourseRegistration, {
      foreignKey:'RequiredCourseId'
    });
  };
  return RequiredCourse;
};