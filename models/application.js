'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    isActive: DataTypes.BOOLEAN,
    isAdmitted: DataTypes.BOOLEAN,
    haspaidAcceptance: DataTypes.BOOLEAN
  }, {});
  Application.associate = function(models) {
    // associations can be defined here
  };
  return Application;
};