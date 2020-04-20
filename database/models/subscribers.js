'use strict';
module.exports = (sequelize, DataTypes) => {
  const subscribers = sequelize.define('subscribers', {
    uid: DataTypes.INTEGER,
    pid: DataTypes.INTEGER,
    package: DataTypes.STRING,
    location: DataTypes.STRING,
    price: DataTypes.STRING,
    avatar: DataTypes.STRING,
    name: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {});
  subscribers.associate = function(models) {
    // associations can be defined here
  };
  return subscribers;
};