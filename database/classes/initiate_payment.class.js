const {mix} = require('mixwith')

const Sequelize = require("sequelize");
const db = require('../models').initiate_payment;
const customer_db = require('../models').customer_froms;
const transaction_db = require('../models').transaction_response;
const verifypayment_db = require('../models').verify_payment;
const card_data_db = require('../models').card_data;
const card_db = require('../models').card;
const ussd_db = require('../models').ussd;




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

  static completeTransaction(body){
    return transaction_db.create(body);
  }

  static create(body){
    return db.create(body);
  }  

  static createUssd(body){
    return ussd_db.create(body);
  }

  static saveVerifiedPayment(body){
    verifypayment_db.create(body).then((result) => {
      return result.id;
    })
  }

  static getVerifiedPayment(query){
    return new Promise((resolve, reject) => {
      Promise.all([
        verifypayment_db.findOne({ 
          where: query
        })
      ]).then(([data])  => {
          return Promise.all([
              resolve(data)   
          ])
      }, reject).then(resolve, reject)
      .catch(reject)
    })
  }
  
  static getTransactionData(query){
    return new Promise((resolve, reject) => {
      Promise.all([
        transaction_db.findOne({ 
          where: query
        })
      ]).then(([data])  => {
          return Promise.all([
              resolve(data)   
          ])
      }, reject).then(resolve, reject)
      .catch(reject)
    })
  }
  
  static saveCard(body){
    card_db.create(body).then((result) => {
      return result.id;
    })
  }

  static saveCardData(body){
    card_data_db.create(body)
  }

  static createCustomer(body){
    return customer_db.create(body);
  }

  static getById({id, login, ...query}){
    return db.findOne({where: {id: id}, order: [ [ 'createdAt', 'DESC' ]]})
  }

  static getOne(query){
      return db.findOne(query).then(([user]) => Promise.resolve(user || null))
  }
}
