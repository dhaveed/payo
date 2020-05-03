'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer_from = sequelize.define('customer_froms', {
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.STRING,
    AccountId: DataTypes.STRING
  }, {});
  customer_from.associate = function(models) {
    // associations can be defined here
  };
  return customer_from;
};