'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      accountType: {
        type: Sequelize.STRING
      },
      pictureUrl: {
        type: Sequelize.STRING
      },
      referalId: {
        type: Sequelize.STRING
      },
      rcountry: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      deviceId: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      address:{
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      ustatus: {
        type: Sequelize.INTEGER
      },
      activation: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },     
      dob: {
        type: Sequelize.STRING
      },
      headers:{
        type: Sequelize.STRING
      },
      ip:{
        type: Sequelize.STRING
      },
      referer:{
        type: Sequelize.STRING
      },
      usertype: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },      
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable('users');
  }
};