'use strict';
module.exports = (sequelize, DataTypes) => {
  const SessionSemester = sequelize.define('SessionSemester', {
    Description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {});
  SessionSemester.associate = function(models) {
    SessionSemester.hasMany(models.CourseRegistration, {
      foreignKey:'SessionSemesterId'
    });
    SessionSemester.hasMany(models.PaymentConfig, {
      foreignKey:'SessionSemesterId'
    });
  };
  return SessionSemester;
};