'use strict';
const products = require("./products");
module.exports = (sequelize, DataTypes) => {
  const carts = sequelize.define('carts', {
    cid: DataTypes.INTEGER,
    uid: DataTypes.INTEGER,
    pid: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  carts.associate = function(models) {
    // associations can be defined here
    carts.belongsTo(models.products, {foreignKey: 'pid', as: 'productsinfo'})
  };
  return carts;
};