'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentSettingLog = sequelize.define('PaymentSettingLog', {
    Transactionref: DataTypes.STRING,
    isSuccessful: DataTypes.BOOLEAN
  }, {});
  PaymentSettingLog.associate = function(models) {
    // associations can be defined here
  };
  return PaymentSettingLog;
};