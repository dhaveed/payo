'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkInsert('users', [{
        email: 'emmanuel.adeojo.ibk@gmail.com',
        firstname: 'Adeojo',
        lastname: 'Emmannuel',
        phone: '+2348088888888',
        password: 'johndoe',
        accountType: 'Savings',
        pictureUrl: 'Null',
        referalId: 'Null',
        rcountry: 'Null',
        token: 'Null',
        deviceId: 'Null',
        role: 'Null',
        address: 'Null',
        gender: 'Null',
        status: 'Null',
        ustatus: 0,
        activation: 'Null',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
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
