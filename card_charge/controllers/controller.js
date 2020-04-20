const $c = require('../requesters/database');
const joi = require('joi')
const _ = require("underscore");
const Ravepay = require('ravepay');
const rave = new Ravepay(process.env.PUBLICK_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);


 
module.exports = class Controller{

  static get createSchema(){
    return joi.object().keys({
      cid:joi.number().required(),
      uid:joi.number().required(),
      name:joi.string().required(),
      photos:joi.string().optional(),
      extention:joi.array().items(joi.string()).default([]).optional(),
      videos:joi.array().items(joi.string()).default([]).optional(),
      region:joi.string(),
      amount:joi.number().required(),
      adtype:joi.string().required(),
      paymentype:joi.number().required(),
      negotiable: joi.boolean().required(),
      currency:joi.string(),
      creator:joi.string().required(),
      category:joi.string().lowercase(),
      featured:joi.boolean(),
      tradexplorer:joi.boolean(),
      approved:joi.boolean(),
      published:joi.boolean(),
      description:joi.string(),
      keywords:joi.array().items(joi.string()).default([]).optional(),
      canExchange:joi.boolean()
    })
  }

  static create(req, res, next){
    $c.Products.create(req.body)
    .then(data =>  {res.json(data)}, err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }
}
