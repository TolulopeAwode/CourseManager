'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    MatricNo: DataTypes.STRING,
    Surname: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    Gender: DataTypes.STRING,
    Password: DataTypes.STRING,
    EmailAddress: DataTypes.STRING,
    PhoneNo: DataTypes.STRING,
    LGA: DataTypes.STRING,
    StateofOrigin: DataTypes.STRING,
    Avatar: DataTypes.STRING,
    Address: DataTypes.STRING,
    DOB: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN
  }, {});
  Student.associate = function(models) {
    Student.hasMany(models.StudentLevel, {
      foreignKey:'StudentId'
    });
  };
  return Student;
};