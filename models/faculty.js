'use strict';
module.exports = (sequelize, DataTypes) => {
  const Faculty = sequelize.define('Faculty', {
    Name: DataTypes.STRING,
    Code: DataTypes.STRING
  }, {});
  Faculty.associate = models =>{
    Faculty.hasMany(models.Departments, {
      foreignKey:'FacultyId'
    });
  };
  return Faculty;
};