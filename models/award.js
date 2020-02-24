'use strict';
module.exports = (sequelize, DataTypes) => {
  const Award = sequelize.define('Award', {
    AwardFullName: DataTypes.STRING,
    AwardAcronym: DataTypes.STRING
  }, {});
   Award.associate = (models) =>{
      Award.hasMany(models.Programme, {
        foreignKey:'AwardId'
      });
      Award.hasMany(models.Awardlevel, {
        foreignKey:'AwardId'
      });
     
   };
  return Award;
};


