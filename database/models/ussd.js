'use strict';
module.exports = (sequelize, DataTypes) => {
  const ussd = sequelize.define('ussd', {
    status: DataTypes.STRING,
    message: DataTypes.STRING,
    amount: DataTypes.STRING,
    type: DataTypes.STRING,
    redirect: DataTypes.STRING,
    note: DataTypes.STRING,
    transaction_date: DataTypes.STRING,
    transaction_reference: DataTypes.STRING,
    flw_reference: DataTypes.STRING,
    redirect_url: DataTypes.STRING,
    payment_code: DataTypes.STRING,
    type_data: DataTypes.STRING,
    meta_data: DataTypes.STRING,
    response_code: DataTypes.STRING,
    response_message: DataTypes.STRING
  }, {});
  ussd.associate = function(models) {
    // associations can be defined here
  };
  return ussd;
};