'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vpaymentid: {
        type: Sequelize.INTEGER
      },
      expirymonth: {
        type: Sequelize.STRING
      },
      expiryyear: {
        type: Sequelize.STRING
      },
      cardBIN: {
        type: Sequelize.STRING
      },
      last4digits: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      card_tokens: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      life_time_token: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cards');
  }
};