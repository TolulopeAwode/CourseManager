'use strict';
module.exports = (sequelize, DataTypes) => {
  const Awardlevel = sequelize.define('Awardlevel', {
    Description: DataTypes.STRING,
    isactive: DataTypes.BOOLEAN,
    AwardId: DataTypes.INTEGER,
    LevelId:DataTypes.INTEGER
  }, {});

  Awardlevel.associate = (models) =>{
   
  };
  return Awardlevel;
};