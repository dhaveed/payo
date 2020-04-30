"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let amount = 50;
    while (amount--) {
      var latitude = faker.address.latitude();
      var longitude = faker.address.longitude();

      data.push({
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        password: faker.internet.password(),
        accountType: faker.finance.account(),
        pictureUrl: faker.image.imageUrl(),
        referalId: faker.random.alphaNumeric(64),
        rcountry: faker.address.country(),
        deviceId: faker.random.uuid(),
        status: faker.random.number(),
        headers: faker.internet.userAgent(),
        ip: faker.internet.ip(),
        city: faker.address.city(),
        location: `[${latitude}, ${longitude}]`,
        latitude: latitude,
        longitude: longitude,
        role: "Null",
        address: faker.address.streetAddress(),
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("users", data);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete("users", null, {});
  },
};
