'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentSetting = sequelize.define('PaymentSetting', {
    Description: DataTypes.STRING,
    Paymentcode: DataTypes.STRING
  }, {});
  PaymentSetting.associate = function(models) {
    PaymentSetting.hasMany(models.PaymentSettingLog, {
      foreignKey:'PaymentId'
    });
  };
  return PaymentSetting;
};