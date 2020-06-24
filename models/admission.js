'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admission = sequelize.define('Admission', {
    isActive: DataTypes.BOOLEAN,
    Description: DataTypes.STRING,
    AdmissionCode: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE
  }, {});
  Admission.associate = (models)=> {
    Admission.hasMany(models.AdmissionProgramme, {
      foreignKey:'AdmissionId'
    });
    Admission.hasMany(models.Applicant, {
      foreignKey:'AdmissionId'
    });
  };
  return Admission;
};
