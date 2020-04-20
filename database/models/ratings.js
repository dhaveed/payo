'use strict';
module.exports = (sequelize, DataTypes) => {
  const ratings = sequelize.define('ratings', {
    user: DataTypes.INTEGER,
    proid: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    review: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    time: DataTypes.TIME
  }, {});
  ratings.associate = function(models) {
    // associations can be defined here
  };
  return ratings;
};