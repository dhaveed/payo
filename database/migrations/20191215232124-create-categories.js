'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      parent: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },      
      icon: {
        type: Sequelize.STRING,
        defaultValue: 0
      },      
      checkFields: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      inputFields: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable('categories');
  }
};