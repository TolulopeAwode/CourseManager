'use strict';
module.exports = (sequelize, DataTypes) => {
  const Courseobjective = sequelize.define('Courseobjective', {
    Description: DataTypes.STRING,
    isactive: DataTypes.BOOLEAN
  }, {});
  Courseobjective.associate = function(models) {
    // associations can be defined here
  };
  return Courseobjective;
};