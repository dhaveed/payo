'use strict';
module.exports = (sequelize, DataTypes) => {
  const walletlog = sequelize.define('walletlog', {
    userid: DataTypes.INTEGER,
    currentBal: DataTypes.STRING,
    previousBal: DataTypes.STRING,
    amount: DataTypes.STRING,
    currency: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    conversionRate: DataTypes.INTEGER,
    walletid: DataTypes.STRING,
    activity: DataTypes.STRING,
    payerId: DataTypes.STRING,
    transfer: DataTypes.BOOLEAN,
    currencyType: DataTypes.STRING
  }, {});
  walletlog.associate = function(models) {
    // associations can be defined here
  };
  return walletlog;
};