
const $c = require('../requesters/database');
const joi = require('joi')
// const joi = require('@hapi/joi');
var request = require('request');
require('dotenv').config()
const Ravepay = require('./../../flutterwave');
const rave = new Ravepay(process.env.RAVE_PUBLICK_KEY, process.env.RAVE_SECRET_KEY, process.env.RAVE_BASE_URL_DEMO);
const Fingerprint = require('express-fingerprint')
 
module.exports = class Controller{

  static get getFeeSchema(){
    return joi.object().keys({
      amount: joi.string().required(),
      currency: joi.string().required()
    })
  }

  static exchange_rates = async ()=> {
    const payload = {
              service: "rates_convert",
              service_method: "post",
              service_version: "v1",
              service_channel: "transactions",
              service_channel_group: "merchants",
              service_payload: {
                FromCurrency: "USD",
                ToCurrency: "NGN",
                Amount: 5000
              }
            };
    try {
      const response = await rave.Misc.exchange_rates(payload, rave);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  static get_fee = async (data)=> {
    const payload = data;
    try {
      const response = await rave.Misc.getFee(payload, rave);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  static list_banks = async ()=> {
    try {
      const response = await rave.Misc.getBanks(rave);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  static listbank(res,req){
    list_banks().then((resp) => {
      res.json(resp)
    }, (err) => {
      resp.status(400).json(err)
    }).catch(err => {
      res.status(500).json(err.toString())
    })
  }


  static getFee(res,req){
    get_fee(req.body).then((resp) => {
      res.json(resp)
    }, (err) => {
      resp.status(400).json(err)
    }).catch(err => {
      res.status(500).json(err.toString())
    })
  }


  static exchangeRate(req, res, next){
    exchange_rates.then(resp => {
          res.json(resp)
    }, (err) =>  {
      res.status(400).json(err);
    }).catch(err => {
          res.status(500).json(err.toString())
    })
  }

}
