'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      reference: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      reference1:{
        type: Sequelize.STRING
      },
      trans:{
        type: Sequelize.STRING
      },
      status:{
        type: Sequelize.STRING
      },
      message:{
        type: Sequelize.STRING
      },
      transaction:{
        type: Sequelize.STRING
      },
      trxref:{
        type: Sequelize.STRING
      },
      custId: {
        type: Sequelize.STRING
      },      
      paymentCode: {
        type: Sequelize.STRING
      },      
      phone: {
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
    return queryInterface.dropTable('transactions');
  }
};