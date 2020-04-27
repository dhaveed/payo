'use strict';

const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let amount = 50;

    while (--amount) {
      data.push({
        user_id: faker.random.number(),
        api_key: faker.random.uuid(40),
        secret_key: faker.random.uuid(40),
        business_settings_id: faker.random.number(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }


      return queryInterface.bulkInsert('business', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
