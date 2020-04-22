'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customers_in_payment_responses', {
      pid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      customer: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      customertoken: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.STRING
      },
      updatedAt: {
        type: Sequelize.STRING
      },
      deletedAt: {
        type: Sequelize.STRING
      },
      AccountId: {
        type: Sequelize.STRING
      },
      pcreatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      pupdatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customers_in_payment_responses');
  }
};