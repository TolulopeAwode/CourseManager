'use strict';
module.exports = (sequelize, DataTypes) => {
  const Applicant = sequelize.define('Applicant', {
    isActive: DataTypes.BOOLEAN,
    FormNo: DataTypes.STRING,
    LoginId: DataTypes.STRING,
    Surname: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    Password: DataTypes.STRING,
    Gender: DataTypes.STRING,
    EmailAddress: DataTypes.STRING,
    PhoneNo: DataTypes.STRING,
    LGA: DataTypes.STRING,
    StateofOrigin: DataTypes.STRING,
    Avatar: DataTypes.STRING,
    Address: DataTypes.STRING,
    DOB: DataTypes.DATE,
  }, {});
  Applicant.associate = function(models) {
    Applicant.hasMany(models.Application, {
      foreignKey:'ApplicantId'
    });
    Applicant.hasMany(models.ApplicationStep, {
      foreignKey:'ApplicantId'
    });
    Applicant.hasMany(models.PaymentSettingLog, {
      foreignKey:'ApplicantId'
    });
  };
  return Applicant;
};