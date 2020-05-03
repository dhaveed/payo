'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction_response = sequelize.define('transaction_response', {
    transaction_reference: DataTypes.STRING,
    responsecode: DataTypes.STRING,
    responsetoken: DataTypes.STRING,
    responsemessage: DataTypes.STRING,
    user_token: DataTypes.STRING,
    embed_token: DataTypes.STRING
  }, {});
  transaction_response.associate = function(models) {
    // associations can be defined here
  };
  return transaction_response;
};