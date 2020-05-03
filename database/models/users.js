'use strict';
var SequelizeTokenify = require('sequelize-tokenify');
const ModelClass = require('../classes/users.class');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    accountType: DataTypes.STRING,
    pictureUrl: DataTypes.STRING,
    referalId: DataTypes.STRING,
    rcountry: DataTypes.STRING,
    token: DataTypes.STRING,
    deviceId: DataTypes.STRING,
    role:DataTypes.STRING,
    address:DataTypes.STRING,
    gender:DataTypes.STRING,
    status:DataTypes.STRING,
    ustatus:DataTypes.INTEGER,
    activation:DataTypes.STRING,
    location:DataTypes.STRING,
    city:DataTypes.STRING,
    dob:DataTypes.STRING,
    headers:DataTypes.STRING,
    ip:DataTypes.STRING,
    referer:DataTypes.STRING,
    usertype:DataTypes.STRING,
    latitude:DataTypes.STRING,
    longitude:DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {});
  SequelizeTokenify.tokenify(users, {
        field: 'referalId',
        length:20
  });
  users.associate = function(models) {
    // associations can be defined here
    // users.loadClass(ModelClass);
  };
  // user.loadModels(ModelClass);
  return users;
};