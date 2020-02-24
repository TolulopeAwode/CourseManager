'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentLevel = sequelize.define('StudentLevel', {
    isActive: DataTypes.BOOLEAN
  }, {});
  StudentLevel.associate = function(models) {
    StudentLevel.hasMany(models.CourseRegistration, {
        foreignKey:'StudentLevelId'
      });
      StudentLevel.hasMany(models.StudentPayment, {
        foreignKey:'StudentLevelId'
      });
  };
  return StudentLevel;
};