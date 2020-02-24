'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    Description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {});
  Session.associate = function(models) {
    Session.hasMany(models.SessionSemester, {
      foreignKey:'SessId'
    });
    Session.hasMany(models.StudentLevel, {
      foreignKey:'SessId'
    });
    Session.hasMany(models.Admission, {
      foreignKey:'SessId'
    });
  };
  return Session;
};