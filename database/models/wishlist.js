'use strict';
module.exports = (sequelize, DataTypes) => {
  const wishlist = sequelize.define('wishlist', {
    pid: DataTypes.INTEGER,
    uid: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  wishlist.associate = function(models) {
    // associations can be defined here
  };
  return wishlist;
};