'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentPayment = sequelize.define('StudentPayment', {
    hasPaid: DataTypes.BOOLEAN,
    TransactionLog: DataTypes.STRING
  }, {});
  StudentPayment.associate = function(models) {
    // associations can be defined here
  };
  return StudentPayment;
};