'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    name: DataTypes.STRING,
    parent: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    checkFields:DataTypes.STRING,
    inputFields:DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {});
  categories.associate = function(models) {
    // associations can be defined here
  };
  return categories;
};