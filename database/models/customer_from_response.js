'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer_from_response = sequelize.define('customer_from_response', {
    pid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    customer: DataTypes.INTEGER,
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
  customer_from_response.associate = function(models) {
    // associations can be defined here
  };
  return customer_from_response;
};