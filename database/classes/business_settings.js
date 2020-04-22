const {mix} = require('mixwith')

const Sequelize = require("sequelize");
const db = require('../models').transactions;




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

  static create(body){
    return db.create(body);
  }

  static getById({id, login, ...query}){
    return db.findOne({where: {id: id}, order: [ [ 'createdAt', 'DESC' ]]})
  }

  static getOne(query){
      return db.findOne(query).then(([user]) => Promise.resolve(user || null))
  }
}
