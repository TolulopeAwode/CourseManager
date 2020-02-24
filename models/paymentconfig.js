'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentConfig = sequelize.define('PaymentConfig', {
      PaymentCode: DataTypes.STRING
  }, {});
  PaymentConfig.associate = function(models) {
    PaymentConfig.hasMany(models.StudentPayment, {
      foreignKey:'PaymentId'
    });
  };
  return PaymentConfig;
};