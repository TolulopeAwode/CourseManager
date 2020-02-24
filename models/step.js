'use strict';
module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('Step', {
    Description: DataTypes.STRING
  }, {});
  Step.associate = function(models) {
    Step.hasMany(models.ApplicationStep, {
      foreignKey:'StepId'
    });
  };
  return Step;
};