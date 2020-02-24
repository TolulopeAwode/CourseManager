'use strict';
module.exports = (sequelize, DataTypes) => {
  const Programme = sequelize.define('Programme', {
    ProgrammeName: DataTypes.STRING,
    ProgrammeCode: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {});
  Programme.associate = function(models) {
    Programme.hasMany(models.ProgrammeLevel, {
      foreignKey:'programmeId'
    });
  };
  return Programme;
};