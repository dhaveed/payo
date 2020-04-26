'use strict';
module.exports = (sequelize, DataTypes) => {
  const business_settings = sequelize.define('business_settings', {
    user_id: DataTypes.INTEGER,
    api_key: DataTypes.STRING,
    secrete_key: DataTypes.STRING,
    enc_key: DataTypes.STRING
  }, {});
  business_settings.associate = function(models) {
    // associations can be defined here
  };
  return business_settings;
};