const $c = require('../requesters/database');
const joi = require('joi')
// const joi = require('@hapi/joi');
var request = require('request');
require('dotenv').config()
const Ravepay = require('./../../flutterwave');
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

  static get tokenizedSchema(){
    return joi.object().keys({
      amount: joi.string().required(),
      email: joi.string().required(),
      firstname: joi.string().required(),
      lastname: joi.string().required()
    })
  }


  static get VerifyTransactionSchema(){
    return joi.object().keys({
      ref: joi.string().required()
    })
  }


  static CardCharge(req, res, next){
    const data =  Object.assign({
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
    },{
      "meta": [{metaname: "flightID", metavalue: "123949494DC"}], 
      "txRef": "MC-" + Date.now(), 
      "device_fingerprint": req.fingerprint.hash, 
      "IP" : req.headers['x-forwarded-for'] || req.connection.remoteAddress
    })

    rave.Card.charge(
      data
    ).then(resp => {
      var initiateTransRespone = {
        "id" : resp.body.data.id,
        "statusCode": resp.statusCode,
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
        "customercandosubsequentnoauth": resp.body.data.customercandosubsequentnoauth
      }

      var CustomerTransResponse = {
        "customer": resp.body.data.customer.fullName,
        "id": resp.body.data.customer.id,
        "phone": resp.body.data.customer.phone,
        "fullName": resp.body.data.customer.fullName,
        "customertoken": resp.body.data.customer.customertoken,
        "email": resp.body.data.customer.email,
        "createdAt": resp.body.data.customer.createdAt,
        "updatedAt": resp.body.data.customer.updatedAt,
        "deletedAt": resp.body.data.customer.deletedAt,
        "AccountId": resp.body.data.customer.AccountId
      }
      $c.Initiate_payment.create(initiateTransRespone).then((data) => {
          $c.Initiate_payment.createCustomer(CustomerTransResponse).then((data2) => { 
            res.json(resp)
          }, (err) => { res.status(400).json(err) }).catch((err) => res.status(500).json(err.toString()));
      }, (err) => {res.status(400).json(err)}).catch((err) => res.status(500).json(err.toString()));
      
    }).catch(err => {
          res.status(500).json(err.toString())
    })
  }

  static validateTransaction(req, res){
    rave.Card.validate(req.body).then(response => {
        var TransResponse = {
            "transaction_reference": req.body.transaction_reference,
            "responsecode":response.body.data.data.responsecode,
            "responsetoken":response.body.data.data.responsecode,
            "responsemessage":response.body.data.data.responsemessage,
            "user_token": response.body.data.chargeToken.user_token,
            "embed_token": response.body.data.chargeToken.embed_token
        }
        $c.Initiate_payment.completeTransaction(TransResponse).then((data) => {
            res.json(response);
        },(err) => {
          res.status(400).json(err)
        }).catch(err => {
          res.status(500).json(err.toString());
        })
    })
  }

  static callVerify =  async (ref) => {
      const payload = {
          txref:ref
      }
      try {
         const response =  await rave.VerifyTransaction.verify(payload, rave)
         return response;
      } catch (error) {
          return error;
      }                            
  }


  static verifyTransaction(req, res){
    Controller.callVerify(req.body.ref).then(resp => {

      const data = {
        "status": resp.body.status,
        "message": resp.body.message,
        "txid": resp.body.data.txid,
        "txref": resp.body.data.txref,
        "flwref": resp.body.data.flwref,
        "devicefingerprint": resp.body.data.devicefingerprint,
        "cycle": resp.body.data.cycle,
        "amount": resp.body.data.amount,
        "currency": resp.body.data.currency,
        "chargedamount": resp.body.data.chargedamount,
        "appfee": resp.body.data.appfee,
        "merchantfee": resp.body.data.merchantfee,
        "merchantbearsfee": resp.body.data.merchantbearsfee,
        "chargecode": resp.body.data.chargecode,
        "chargemessage": resp.body.data.chargemessage,
        "authmodel": resp.body.data.authmodel,
        "ip": resp.body.data.ip,
        "narration": resp.body.data.narration,
        "status": resp.body.data.status,
        "vbvcode": resp.body.data.vbvcode,
        "vbvmessage": resp.body.data.vbvmessage,
        "authurl": resp.body.data.authurl,
        "acctcode": resp.body.data.acctcode,
        "acctmessage": resp.body.data.acctmessage,
        "paymenttype": resp.body.data.paymenttype,
        "paymentid": resp.body.data.paymentid,
        "fraudstatus": resp.body.data.fraudstatus,
        "chargetype": resp.body.data.chargetype,
        "createdday": resp.body.data.createdday,
        "createddayname": resp.body.data.createddayname,
        "createdweek": resp.body.data.createdweek,
        "createdmonth": resp.body.data.createdmonth,
        "createdmonthname": resp.body.data.createdmonthname,
        "createdquarter": resp.body.data.createdquarter,
        "createdyear": resp.body.data.createdyear,
        "createdyearisleap": resp.body.data.createdyearisleap,
        "createddayispublicholiday": resp.body.data.createddayispublicholiday,
        "createdhour": resp.body.data.createdhour,
        "createdminute": resp.body.data.createdminute,
        "createdpmam": resp.body.data.createdpmam,
        "created": resp.body.data.created,
        "customerid": resp.body.data.customerid,
        "custphone": resp.body.data.custphone,
        "custnetworkprovider": resp.body.data.custnetworkprovider,
        "custname": resp.body.data.custname,
        "custemail": resp.body.data.custemail,
        "custemailprovider": resp.body.data.custemailprovider,
        "custcreated": resp.body.data.custcreated,
        "accountid": resp.body.data.accountid,
        "acctbusinessname": resp.body.data.acctbusinessname,
        "acctcontactperson": resp.body.data.acctcontactperson,
        "acctcountry": resp.body.data.acctcountry,
        "acctbearsfeeattransactiontime": resp.body.data.acctbearsfeeattransactiontime,
        "acctparent": resp.body.data.acctparent,
        "acctvpcmerchant": resp.body.data.acctvpcmerchant,
        "acctalias": resp.body.data.acctalias,
        "acctisliveapproved": resp.body.data.acctisliveapproved,
        "orderref": resp.body.data.orderref,
        "paymentplan": resp.body.data.paymentplan,
        "paymentpage": resp.body.data.paymentpage,
        "raveref": resp.body.data.raveref,
        "meta": resp.body.data.meta
      }

      $c.Initiate_payment.saveVerifiedPayment(data).then((data) => {
        const card = {
          "vpaymentid": data,
          "expirymonth": resp.body.data.card.expirymonth,
          "expiryyear": resp.body.data.card.expiryyear,
          "cardBIN": resp.body.data.card.cardBIN,
          "last4digits": resp.body.data.last4digits,
          "brand": resp.body.data.card.brand,
          "card_tokens": 2,
          "type": resp.body.data.card.type,
          "life_time_token": resp.body.data.card.life_time_token
        }
        $c.Initiate_payment.saveCard(card).then((data2) => { 
          const card_data = {
              "card_id": data2,
              "embedtoken": resp.body.data.card.card_tokens.embedtoken,
              "shortcode": resp.body.data.card.card_tokens.embedtoken,
              "expiry": resp.body.data.card.card_tokens.embedtoken
          }
          $c.Initiate_payment.saveCardData(card_data).then((data2) => { 
            res.json(resp)
          }, (err) => { res.status(400).json(err) }).catch((err) => res.status(500).json(err.toString()));

        }, (err) => { res.status(400).json(err) }).catch((err) => res.status(500).json(err.toString()));
      }, (err) => {res.status(400).json(err)}).catch((err) => res.status(500).json(err.toString()));
      
    }, (err) => {
       res.status(400).json(err);
    }).catch(err => {
      res.status(500).json(err.toString())
    })
  }


  static tokenizedCharge(req, res){
    $c.Initiate_payment.getVerifiedPayment({"email" : req.params.email})      
     .then((response) => {
       $c.Initiate_payment.getTransactionData({"transaction_reference" : response.flwref}).then((res) => {
         rave.TokenCharge.card({
           "currency":"NGN",
           "SECKEY": process.env.RAVE_SECRET_KEY,
           "token":res.embed_token,
           "country":"NG",
           "amount":req.params.amount,
           "email":req.params.email,
           "firstname":req.params.firstname,
           "lastname":req.params.lastname,
           "IP":response.ip,
           "txRef":response.flwref
        }).then(resp => {
            var initiateTransRespone = {
              "id" : resp.body.data.id,
              "statusCode": resp.statusCode,
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
              "customercandosubsequentnoauth": resp.body.data.customercandosubsequentnoauth
            }

            var CustomerTransResponse = {
              "customer": resp.body.data.customer.fullName,
              "id": resp.body.data.customer.id,
              "phone": resp.body.data.customer.phone,
              "fullName": resp.body.data.customer.fullName,
              "customertoken": resp.body.data.customer.customertoken,
              "email": resp.body.data.customer.email,
              "createdAt": resp.body.data.customer.createdAt,
              "updatedAt": resp.body.data.customer.updatedAt,
              "deletedAt": resp.body.data.customer.deletedAt,
              "AccountId": resp.body.data.customer.AccountId
            }
            $c.Initiate_payment.create(initiateTransRespone).then((data) => {
                $c.Initiate_payment.createCustomer(CustomerTransResponse).then((data2) => { 
                  res.json(resp)
                }, (err) => { res.status(400).json(err) }).catch((err) => res.status(500).json(err.toString()));
            }, (err) => {res.status(400).json(err)}).catch((err) => res.status(500).json(err.toString()));            
        }).catch(err => {
            res.status(500).json(err.toString())
        })
      })
    })
    .catch(err => {
      res.status(500).json(err.toString())
    })
  }
}
