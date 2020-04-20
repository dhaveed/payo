'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    userid: DataTypes.INTEGER,
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    reference: DataTypes.STRING,
    source: DataTypes.STRING,
    reference1:DataTypes.STRING,
    trans:DataTypes.STRING,
    status:DataTypes.STRING,
    message:DataTypes.STRING,
    transaction:DataTypes.STRING,
    trxref:DataTypes.STRING,
    custId:DataTypes.INTEGER,
    paymentCode: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  transactions.associate = function(models) {
    // associations can be defined here
  };
  return transactions;
};