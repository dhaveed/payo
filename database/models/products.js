'use strict';
const carts = require("./carts");

module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    cid: DataTypes.INTEGER,
    uid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    photos: DataTypes.STRING,
    extention: DataTypes.ARRAY(DataTypes.STRING),
    videos: DataTypes.ARRAY(DataTypes.STRING),
    region: DataTypes.STRING,
    amount: DataTypes.STRING,
    currency: DataTypes.STRING,
    coverPhoto: DataTypes.STRING,
    creator: DataTypes.STRING,
    coverVideo: DataTypes.STRING,
    price: DataTypes.STRING,
    negotiable: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    subcategory: DataTypes.ARRAY(DataTypes.INTEGER),
    paymentype: DataTypes.INTEGER,
    adtype: DataTypes.INTEGER,
    ustatus: DataTypes.INTEGER,
    category: DataTypes.STRING,
    featured: DataTypes.INTEGER,
    tradexplorer: DataTypes.BOOLEAN,
    views: DataTypes.NUMBER,
    approved: DataTypes.BOOLEAN,
    published: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    keywords: DataTypes.ARRAY(DataTypes.TEXT),
    popular: DataTypes.BOOLEAN,
    special: DataTypes.BOOLEAN,
    canExchange: DataTypes.INTEGER,
    checkFields: DataTypes.STRING,
    inputFields: DataTypes.STRING
  }, {});
  products.associate = function(models) {
    // associations can be defined here
  };
 
  return products;
};