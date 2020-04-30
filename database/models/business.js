'use strict';
module.exports = (sequelize, DataTypes) => {
  const business = sequelize.define('business', {
    user_id: DataTypes.INTEGER,
    businessName: DataTypes.STRING,
    businessEmail: DataTypes.STRING,
    businessType: DataTypes.STRING,
  }, {
    freezeTableName: true,
  });
  business.associate = function(models) {
    // associations can be defined here
  };
  return business;
};