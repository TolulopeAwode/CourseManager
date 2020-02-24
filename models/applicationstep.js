'use strict';
module.exports = (sequelize, DataTypes) => {
  const ApplicationStep = sequelize.define('ApplicationStep', {
    Description: DataTypes.STRING,
    hasCompleted: DataTypes.BOOLEAN
  }, {});
  ApplicationStep.associate = function(models) {
    // associations can be defined here
  };
  return ApplicationStep;
};