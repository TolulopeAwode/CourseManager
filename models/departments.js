'use strict';
module.exports = (sequelize, DataTypes) => {
  const Departments = sequelize.define('Departments', {
    Name: DataTypes.STRING,
    Code: DataTypes.STRING,
    FacultyId: DataTypes.INTEGER
  }, {});
  Departments.associate = function(models) {
    Departments.hasMany(models.Programme, {
      foreignKey:'DepartmentId'
    });
    Departments.hasMany(models.Course, {
      foreignKey:'DepartmentId'
    });
  };
  return Departments;
};