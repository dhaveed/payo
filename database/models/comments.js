'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    user: DataTypes.INTEGER,
    pid: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    editted: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    time: DataTypes.TIME
  }, {});
  comments.associate = function(models) {
    // associations can be defined here
  };
  return comments;
};