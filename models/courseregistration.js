'use strict';
module.exports = (sequelize, DataTypes) => {
  const CourseRegistration = sequelize.define('CourseRegistration', {
    isActive: DataTypes.BOOLEAN
  }, {});
  CourseRegistration.associate = function(models) {
    // associations can be defined here
  };
  return CourseRegistration;
};