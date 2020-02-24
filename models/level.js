'use strict';
module.exports = (sequelize, DataTypes) => {
  const Level = sequelize.define('Level', {
    Description: DataTypes.STRING,
    OrderId: DataTypes.INTEGER
  }, {});
  Level.associate = function(models) {
    Level.hasMany(models.Awardlevel, {
      foreignKey:'LevelId'
    });
    Level.hasMany(models.ProgrammeLevel, {
      foreignKey:'LevelId'
    });
  };
  return Level;
};