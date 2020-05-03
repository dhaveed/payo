'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ussds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      redirect: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      transaction_date: {
        type: Sequelize.STRING
      },
      transaction_reference: {
        type: Sequelize.STRING
      },
      flw_reference: {
        type: Sequelize.STRING
      },
      redirect_url: {
        type: Sequelize.STRING
      },
      payment_code: {
        type: Sequelize.STRING
      },
      type_data: {
        type: Sequelize.STRING
      },
      meta_data: {
        type: Sequelize.STRING
      },
      response_code: {
        type: Sequelize.STRING
      },
      response_message: {
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
    return queryInterface.dropTable('ussds');
  }
};