'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('wallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER
      },
      walletid:{
        type: Sequelize.STRING
      },
      currentBal: {
        type: Sequelize.STRING,
        defaultValue: "NGN"
      },
      previousBal: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      lastUpdated: {
        type: Sequelize.DATE
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: "NGN"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('wallets');
  }
};