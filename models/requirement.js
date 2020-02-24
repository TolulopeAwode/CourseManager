'use strict';
module.exports = (sequelize, DataTypes) => {
  const Requirement = sequelize.define('Requirement', {
    Description: DataTypes.STRING,
    MaximumUnit: DataTypes.INTEGER,
    MinimumUnit: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {});
  Requirement.associate = function(models) {
    Requirement.hasMany(models.RequiredCourse, {
      foreignKey:'RequirementId'
    });
  };
  return Requirement;
};