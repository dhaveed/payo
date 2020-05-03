'use strict';
module.exports = (sequelize, DataTypes) => {
  const card = sequelize.define('card', {
    vpaymentid: DataTypes.INTEGER,
    expirymonth: DataTypes.STRING,
    expiryyear: DataTypes.STRING,
    cardBIN: DataTypes.STRING,
    last4digits: DataTypes.STRING,
    brand: DataTypes.STRING,
    card_tokens: DataTypes.INTEGER,
    type: DataTypes.STRING,
    life_time_token: DataTypes.STRING
  }, {});
  card.associate = function(models) {
    // associations can be defined here
  };
  return card;
};