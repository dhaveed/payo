const {mix} = require('mixwith')

const Sequelize = require("sequelize");
const db = require('../models').business_settings;




module.exports = class transactionModelClass extends Sequelize.Model {

  static classback({...body}){    
    return new Promise((resolve, reject) => {
        return Promise.all([
          db.create(Object.assign(body)),
        ])
      .then(resolve, reject)
      .catch(reject =>  console.log("i dont like it here -1"))
    })
  }

  static testConnection(data){
    return data;
  }

  static generateKey() {
    
    return {
      api_key: "",
      secret_key: "",
      enc_key: "",
    }
  }

  static create(business_id){
    return new Promise((resolve, reject) => {
      console.log(Object.assign({ business_id }));
      return Promise(db.create(Object.assign({ business_id })))
        .then(resolve, reject)
        .catch((reject) =>
          console.log("Error: Cannot create business")
        );
    });
  }

  static getById({id, login, ...query}){
    return db.findOne({where: {id: id}, order: [ [ 'createdAt', 'DESC' ]]})
  }

  static getOne(query){
      return db.findOne(query).then(([user]) => Promise.resolve(user || null))
  }
}
