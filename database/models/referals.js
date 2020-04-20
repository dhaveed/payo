'use strict';
module.exports = (sequelize, DataTypes) => {
  const referals = sequelize.define('referals', {
    userId: DataTypes.INTEGER,
    downline: DataTypes.INTEGER
  }, {});
  referals.associate = function(models) {
    // associations can be defined here
    referals.belongsTo(models.users);
  };
  return referals;
};