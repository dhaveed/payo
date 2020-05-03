'use strict';
module.exports = (sequelize, DataTypes) => {
  const card_data = sequelize.define('card_data', {
    card_id: DataTypes.INTEGER,
    embedtoken: DataTypes.STRING,
    shortcode: DataTypes.STRING,
    expiry: DataTypes.STRING
  }, {});
  card_data.associate = function(models) {
    // associations can be defined here
  };
  return card_data;
};