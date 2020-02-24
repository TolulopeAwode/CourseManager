'use strict';
module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define('Semester', {
    Description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {});
  Semester.associate = function(models) {
    Semester.hasMany(models.SessionSemester, {
      foreignKey:'SemId'
    });
    Semester.hasMany(models.Requirement, {
      foreignKey:'SemId'
    });
  };
  return Semester;
};