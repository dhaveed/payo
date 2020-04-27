'use strict';

const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let amount = 50;

    while (amount--) {
      data.push({
        user_id: faker.random.number(),
        business_id: faker.random.number(),
        api_key: faker.random.alphaNumeric(40),
        enc_key: faker.random.alphaNumeric(20),
        secret_key: faker.random.alphaNumeric(40),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }


      return queryInterface.bulkInsert('business_settings', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */

      return queryInterface.bulkDelete('business_settings', null, {});
  }
};
