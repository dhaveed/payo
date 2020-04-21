const $c = require('../requesters/database');
const joi = require('joi')
var request = require('request');
require('dotenv').config()
const Ravepay = require('./../../flutterwave-node');
const rave = new Ravepay(process.env.RAVE_PUBLICK_KEY, process.env.RAVE_SECRET_KEY, process.env.RAVE_BASE_URL_DEMO);
const Fingerprint = require('express-fingerprint')
 
module.exports = class Controller{

  static get CardChargeSchema(){
    return joi.object().keys({
      apikey: joi.string().required(),
      secretekey: joi.string().required(),
      cardno: joi.number().required(),
      cvv: joi.number().required(),
      expirymonth: joi.number().required(),
      expiryyear: joi.number().required(),
      currency:joi.string().required(),
      country: joi.string().required(),
      amount: joi.number().required(),
      email: joi.string().required(),
      phonenumber: joi.number().required(),
      firstname: joi.string().required(),
      lastname: joi.string().required(),
      redirect_url: joi.string().required(),
    })
  }

  static get ValidateTransactionSchema(){
    return joi.object().keys({
      transaction_reference: joi.string().required(),
      otp: joi.string().required(),
    })
  }


  static CardCharge(req, res, next){
    rave.Card.charge(
      Object.assign(
          {
            apikey: req.body.apikey,
            secretekey: req.body.secretekey,
            cardno: req.body.cardno,
            cvv: req.body.cvv,
            expirymonth: req.body.expirymonth,
            expiryyear: req.body.expiryyear,
            currency: req.body.currency,
            country: req.body.country,
            amount: req.body.amount,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            redirect_url: req.body.redirect_url,
          }, 
          {
            "meta": [{metaname: "flightID", metavalue: "123949494DC"}], 
            "txRef": "MC-" + Date.now(), 
            "device_fingerprint": req.fingerprint.hash, 
            "IP" : req.headers['x-forwarded-for'] || req.connection.remoteAddress
          }
    )).then(resp => {
      // console.log(resp.body);
      res.json(resp);
      
    }).catch(err => {
          console.log(err);
          res.status(500).json(err.toString())
    })
  }

  static validateTransaction(req, res){
    rave.Card.validate(req.body).then(response => {
            console.log(response.body.data.tx);
            res.json(response);
      })
  }
}
