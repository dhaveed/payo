const Login = require("./response");
const Sequelize = require("sequelize");
const raw = require("../models");
const db = require("../models").business;

module.exports = class businessModelClass extends Sequelize.Model {
  static isIdUnique(businessEmail) {
    return db
      .count({ where: { businessEmail: businessEmail } })
      .then((count) => {
        if (count != 0) {
          return false;
        }
        return true;
      });
  }

  static find() {
    db.findAll();
  }

  static fetchOne(query) {
    return new Promise((resolve, reject) => {
      db.findOne(query)
        .then((business) => resolve(business))
        .catch(reject);
    });
  }

  static createBusiness({ businessEmail, ...body }, user_id) {
    return new Promise((resolve, reject) => {
      this.isIdUnique(businessEmail)
        .then((isUnique) => {
          if (isUnique) {
            return new Promise((resolve, reject) => {
              console.log(Object.assign({ businessEmail }, body));
              return Promise(db.create(Object.assign({ businessEmail, user_id }, body)))
                .then(resolve, reject)
                .catch((reject) =>
                  console.log("Error: Cannot create business")
                );
            });
          } else {
            return reject({ message: "Business Exists" });
          }
        }, reject)
        .then(resolve, reject)
        .catch((reject) => {
          console.log("i dont like it here 2");
        });
    });
  }
};
