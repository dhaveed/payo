'use strict';
var SequelizeTokenify = require('sequelize-tokenify');

module.exports = (sequelize, DataTypes) => {
  const wallet = sequelize.define('wallet', {
    userid: DataTypes.INTEGER,
    walletid:DataTypes.STRING,
    currentBal: DataTypes.STRING,
    previousBal: DataTypes.STRING,
    lastUpdated: DataTypes.DATE,
    currency: DataTypes.STRING
  }, {});
    SequelizeTokenify.tokenify(wallet, {
        field: 'walletid',
        length:40
  });

  wallet.associate = function(models) {
    // associations can be defined here
  };
  return wallet;
};