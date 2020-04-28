const { mix } = require("mixwith");

const Sequelize = require("sequelize");
const db = require("../models").business_settings;

module.exports = class transactionModelClass extends Sequelize.Model {
  static classback({ ...body }) {
    return new Promise((resolve, reject) => {
      return Promise.all([db.create(Object.assign(body))])
        .then(resolve, reject)
        .catch((reject) => console.log("i dont like it here -1"));
    });
  }

  static testConnection(data) {
    return data;
  }

  static generateKey() {
    return {
      api_key: "payo-mtUJv0oOeBnNcNUcuYfvMR04PGzbuT8Q49FaYLsL",
      secret_key: "payo-d6pGGicDPac1Ds2KWYYbDK8QRMoIJJUmje6vCnTB",
      enc_key: "payo-eylqRsdaH7y5IxhMeWDk",
    };
  }

  static create({ id, user_id }) {
    console.log(id, user_id);
    return new Promise((resolve, reject) => {
      return Promise.all([
        db.create(
          Object.assign({ business_id: id, user_id }, this.generateKey())
        ),
      ])
        .then(resolve, reject)
        .catch((reject) => console.log("Error: Cannot create business"));
    });
  }

  static getById({ id, login, ...query }) {
    return db.findOne({ where: { id: id }, order: [["createdAt", "DESC"]] });
  }

  static getOne(query) {
    return db.findOne(query).then(([user]) => Promise.resolve(user || null));
  }
};
