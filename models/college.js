'use strict';
module.exports = (sequelize, DataTypes) => {
  const College = sequelize.define('College', {
    CollegeName: DataTypes.STRING,
    CollegeAcronyms: DataTypes.STRING
  }, {});
  College.associate = (models)=> {
    College.hasMany(models.Faculty, {
      foreignKey:'CollegeId'
    });
  };
  return College;
};


