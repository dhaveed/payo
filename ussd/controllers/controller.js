const $c = require('../requesters/database');
const joi = require('joi')
// const joi = require('@hapi/joi');
var request = require('request');
require('dotenv').config()
const Ravepay = require('./../../flutterwave');
const rave = new Ravepay(process.env.RAVE_PUBLICK_KEY, process.env.RAVE_SECRET_KEY, process.env.RAVE_BASE_URL_DEMO);
const Fingerprint = require('express-fingerprint')
 
module.exports = class Controller{

  static get ussdChargeSchema(){
    return joi.object().keys({
      apikey: joi.string().required(),
      secretekey: joi.string().required(),
      accountbank: joi.string().required(),
      currency: joi.string().required(),
      country: joi.string().required(),
      amount: joi.string().required(),
      email: joi.string().required(),
      phonenumber: joi.string().required(),
      firstname: joi.string().required(),
      lastname: joi.string().required(),
      is_ussd: joi.string().required(),
      payment_type: joi.string().required(),
    })
  }

  static Ussd_charge = async(body)=> {
    const payload = body
    try {
      const response = await rave.USSD.charge(payload, rave);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  static UssdCharge(req, res, next){
    const data =  Object.assign({
      "accountbank": req.body.accountbank,
      "currency": req.body.currency,
      "country": req.body.country,
      "amount": req.body.amount,
      "email": req.body.email,
      "phonenumber": req.body.phonenumber,
      "firstname": req.body.firstname,
      "lastname": req.body.lastname,
      "is_ussd": req.body.is_ussd,
      "payment_type": req.body.payment_type,
    },{
      "meta": [{metaname: "flightID", metavalue: "123949494DC"}], 
      "txRef": "MC-" + Date.now(), 
      "orderRef": "MC_" + Date.now(),
      "device_fingerprint": req.fingerprint.hash, 
      "IP" : req.headers['x-forwarded-for'] || req.connection.remoteAddress
    })

    Controller.Ussd_charge(
      data
    ).then(resp => {
      var ussd = {
          "status": resp.body.status,
          "message": resp.body.message,
          "amount": resp.body.data.data.amount,
          "type": resp.body.data.data.type,
          "redirect": resp.body.data.data.redirect,
          "note": resp.body.data.data.note,
          "transaction_date": resp.body.data.data.transaction_date,
          "transaction_reference": resp.body.data.data.transaction_reference,
          "flw_reference": resp.body.data.data.flw_reference,
          "redirect_url": resp.body.data.data.redirect_url,
          "payment_code": resp.body.data.data.payment_code,
          "type_data": resp.body.data.data.type_data,
          "meta_data": resp.body.data.data.meta_data,
          "response_code": resp.body.data.response_code,
          "response_message": resp.body.data.response_message
      }
 

      var TransResponse = {
          "transaction_reference": req.body.data.data.transaction_reference,
          "responsecode":response.body.data.response_code,
          "responsetoken":null,
          "responsemessage":response.body.data.response_message,
          "user_token": null,
          "embed_token": null
      }

      $c.Initiate_payment.createUssd(ussd).then((data) => {
        $c.Initiate_payment.completeTransaction(TransResponse).then((data) => {
            res.json(response);
        },(err) => {
          res.status(400).json(err)
        }).catch(err => {
          res.status(500).json(err.toString());
        })
      }, (err) => {res.status(400).json(err)}).catch((err) => res.status(500).json(err.toString()));
      
    }).catch(err => {
          res.status(500).json(err.toString())
    })
  }
}
