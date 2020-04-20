const $c = require('../requesters/database');
const joi = require('joi')
const Ravepay = require('ravepay');
const rave = new Ravepay(process.env.PUBLICK_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
const Fingerprint = require('express-fingerprint')
 
module.exports = class Controller{

  static get createSchema(){
    return joi.object().keys({
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

  static CardCharge(req, res, next){
    rave.Card.charge(
      Object.assign(
        req.body, 
          {
            "meta": [{metaname: "flightID", metavalue: "123949494DC"}], 
            "txRef": "MC-" + Date.now(), 
            "device_fingerprint": req.fingerprint, 
            "IP" : req.headers['x-forwarded-for'] || req.connection.remoteAddress
          }
    )).then(resp => {
      // console.log(resp.body);
      rave.Card.validate({
            "transaction_reference":resp.body.data.flwRef,
            "otp":12345
      }).then(response => {
            console.log(response.body.data.tx);
            res.json(response);
      })
    }).catch(err => {
          console.log(err);
          res.status(500).json(err.toString())
    })
  }
}
