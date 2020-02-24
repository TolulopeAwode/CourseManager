'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdmissionProgramme = sequelize.define('AdmissionProgramme', {
    isActive: DataTypes.BOOLEAN,
    Description: DataTypes.STRING
  }, {});
  AdmissionProgramme.associate = function(models) {
    // associations can be defined here
  };
  return AdmissionProgramme;
};