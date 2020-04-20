'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cid: {
        type: Sequelize.INTEGER
      },
      uid: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      photos: {
        type: Sequelize.STRING,
      },
      extention: {
        type: Sequelize.STRING,
        get: function() {
            return JSON.parse(this.getDataValue('extention'));
        }, 
        set: function(val) {
            return this.setDataValue('extention', JSON.stringify(val));
        }
      },
      videos: {
        type: Sequelize.STRING,
        get: function() {
            return JSON.parse(this.getDataValue('videos'));
        }, 
        set: function(val) {
            return this.setDataValue('videos', JSON.stringify(val));
        }
      },
      region: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      coverPhoto: {
        type: Sequelize.STRING
      },
      creator: {
        type: Sequelize.STRING
      },
      coverVideo: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      negotiable: {
        type: Sequelize.BOOLEAN
      },
      address: {
        type: Sequelize.BOOLEAN
      },
      subcategory: {
        type: Sequelize.STRING,
        defaultValue: null,
        get: function() {
            return JSON.parse(this.getDataValue('subcategory'));
        }, 
        set: function(val) {
            return this.setDataValue('subcategory', JSON.stringify(val));
        }
      },
      paymentype:  {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      adtype:  {
        type: Sequelize.INTEGER
      },
      ustatus:  {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      featured: {
        type: Sequelize.INTEGER
      },
      tradexplorer: {
        type: Sequelize.BOOLEAN
      },
      views: {
        type: Sequelize.INTEGER
      },
      approved: {
        type: Sequelize.BOOLEAN
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      description: {
        type: Sequelize.STRING
      },
      keywords: {
        type: Sequelize.STRING,
        get: function() {
            return JSON.parse(this.getDataValue('keywords'));
        }, 
        set: function(val) {
            return this.setDataValue('keywords', JSON.stringify(val));
        }
      },
      popular: {
        type: Sequelize.BOOLEAN
      },
      special: {
        type: Sequelize.BOOLEAN
      },
      canExchange: {
        type: Sequelize.INTEGER
      },
      checkFields:  {
        type: Sequelize.STRING
      },
      inputFields:  {
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
    return queryInterface.dropTable('products');
  }
};