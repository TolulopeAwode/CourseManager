'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProgrammeLevel = sequelize.define('ProgrammeLevel', {
    Description: DataTypes.STRING,
    isactive: DataTypes.BOOLEAN,
    LevelId: DataTypes.INTEGER,
    programmeId: DataTypes.INTEGER  
  }, {});
  ProgrammeLevel.associate = function(models) {
    ProgrammeLevel.hasMany(models.Requirement, {
      foreignKey:'ProgrammeLevId'
    });
    ProgrammeLevel.hasMany(models.StudentLevel, {
      foreignKey:'ProgrammeLevId'
    });
    ProgrammeLevel.hasMany(models.PaymentConfig, {
      foreignKey:'ProgrammeLevId'
    });
    ProgrammeLevel.hasMany(models.AdmissionProgramme, {
      foreignKey:'ProgrammeLevId'
    });
  };
  return ProgrammeLevel;
};

