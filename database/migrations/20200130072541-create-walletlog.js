'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('walletlog', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER
      },
      currentBal: {
        type: Sequelize.STRING
      },
      previousBal: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      conversionRate: {
        type: Sequelize.INTEGER
      },
      walletid: {
        type: Sequelize.STRING
      },
      activity: {
        type: Sequelize.STRING
      },
      payerId: {
        type: Sequelize.STRING
      },
      transfer: {
        type: Sequelize.BOOLEAN
      },
      currencyType: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('walletlog');
  }
};