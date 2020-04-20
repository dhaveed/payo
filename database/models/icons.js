'use strict';
module.exports = (sequelize, DataTypes) => {
  const icons = sequelize.define('icons', {
    name: DataTypes.STRING,
    fontimg: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {});
  icons.associate = function(models) {
    // associations can be defined here
  };
  return icons;
};