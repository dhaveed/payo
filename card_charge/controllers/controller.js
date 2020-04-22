const $c = require('../requesters/database');
const joi = require('joi')
// const joi = require('@hapi/joi');
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
      cardno: joi.string().required(),
      cvv: joi.string().required(),
      expirymonth: joi.string().required(),
      expiryyear: joi.string().required(),
      currency:joi.string().required(),
      country: joi.string().required(),
      amount: joi.number().required(),
      email: joi.string().required(),
      phonenumber: joi.string().required(),
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
    const data =       
      Object.assign(
            {
              "cardno": req.body.cardno,
              "cvv": req.body.cvv,
              "expirymonth": req.body.expirymonth,
              "expiryyear": req.body.expiryyear,
              "currency": req.body.currency,
              "country": req.body.country,
              "amount": req.body.amount,
              "email": req.body.email,
              "phonenumber": req.body.phonenumber,
              "firstname": req.body.firstname,
              "lastname": req.body.lastname,
              "redirect_url": req.body.redirect_url,
            }, 
            {
              "meta": [{metaname: "flightID", metavalue: "123949494DC"}], 
              "txRef": "MC-" + Date.now(), 
              "device_fingerprint": req.fingerprint.hash, 
              "IP" : req.headers['x-forwarded-for'] || req.connection.remoteAddress
            }
    )
    // console.log(req.body);
    rave.Card.charge(
      data
    ).then(resp => {
      // console.log(resp.body);
      var initiateTransRespone = {
        "id" : resp.body.data.id,
        "status": resp.body.status,
        "message": resp.body.message,
        "txRef": resp.body.data.txRef,
        "orderRef": resp.body.data.orderRef,
        "flwRef": resp.body.data.flwRef,
        "redirectUrl": resp.body.data.redirectUrl,
        "device_fingerprint": resp.body.data.device_fingerprint,
        "settlement_token": resp.body.data.settlement_token,
        "cycle": resp.body.data.cycle,
        "amount": resp.body.data.amount,
        "charged_amount": resp.body.data.charged_amount,
        "appfee": resp.body.data.appfee,
        "merchantfee": resp.body.data.merchantfee,
        "merchantbearsfee": resp.body.data.merchantbearsfee,
        "chargeResponseCode": resp.body.data.chargeResponseCode,
        "chargeResponseMessage": resp.body.data.chargeResponseMessage,
        "authModelUsed": resp.body.data.authModelUsed,
        "currency": resp.body.data.currency,
        "IP": resp.body.data.IP,
        "narration": resp.body.data.narration,
        "status": resp.body.data.status,
        "vbvrespmessage": resp.body.data.vbvrespmessage,
        "authurl": resp.body.data.authurl,
        "vbvrespcode": resp.body.data.vbvrespcode,
        "acctvalrespmsg": resp.body.data.acctvalrespmsg,
        "acctvalrespcode": resp.body.data.acctvalrespcode,
        "paymentType": resp.body.data.paymentType,
        "paymentId": resp.body.data.paymentId,
        "fraud_status": resp.body.data.fraud_status,
        "charge_type": resp.body.data.charge_type,
        "is_live": resp.body.data.is_live,
        "createdAt": resp.body.data.createdAt,
        "updatedAt": resp.body.data.updatedAt,
        "deletedAt": resp.body.data.deletedAt,
        "customerId": resp.body.data.customerId,
        "AccountId": resp.body.data.AccountId,
        "customercandosubsequentnoauth": resp.body.customercandosubsequentnoauth
      }

      var CustomerTransRespone = {
        "customer": resp.body.datacustomer,
        "id": resp.body.data.id,
        "phone": resp.body.data.phone,
        "fullName": resp.body.data.fullName,
        "customertoken": resp.body.data.customertoken,
        "email": resp.body.data.email,
        "createdAt": resp.body.data.createdAt,
        "updatedAt": resp.body.data.updatedAt,
        "deletedAt": resp.body.data.deletedAt,
        "AccountId": resp.body.data.AccountId
      }

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
