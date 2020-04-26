'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers_in_payment_response = sequelize.define('customers_response', {
    pid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    customer: DataTypes.STRING,
    id: DataTypes.STRING,
    phone: DataTypes.STRING,
    fullName: DataTypes.STRING,
    customertoken: DataTypes.STRING,
    email: DataTypes.STRING,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    deletedAt: DataTypes.STRING,
    AccountId: DataTypes.STRING
  }, {});
  customers_in_payment_response.associate = function(models) {
    // associations can be defined here
  };
  return customers_in_payment_response;
};