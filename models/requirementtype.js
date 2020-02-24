'use strict';
module.exports = (sequelize, DataTypes) => {
  const RequirementType = sequelize.define('RequirementType', {
    Description: DataTypes.STRING
  }, {});
  RequirementType.associate = function(models) {
    RequirementType.hasMany(models.Requirement, {
      foreignKey:'RequirementTypeId'
    });
  };
  return RequirementType;
};