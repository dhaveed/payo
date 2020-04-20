

const $u = require('../requesters/database');
const joi = require('joi');


module.exports = class ratingController{

  static get(req, res){
    $u.Products.ratings({
      id : req.params.product
    })
    .then(data => res.json(data), err => {
      console.log({err})
      res.status(400).json(err)
    })
    .catch(err => res.status(500).json(err.toString()))
  }


  static get createSchema(){
    return joi.object().keys({
      user : joi.string().length(24).alphanum().required(),
      review : joi.string().required(),
      rating : joi.number().min(1).max(5)
    })
  }

  static create(req, res){
    $u.Products.rate(Object.assign(req.body ,{
      id : req.params.product
    }))
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static get updateSchema(){
    return joi.object().keys({
      review : joi.string(),
      rating : joi.number().min(1).max(5)
    })
  }

  static update(req, res){
    $u.User.updateRating(Object.assign(req.body ,{
      id : req.params.class
    }))
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }


  static delete(req, res){
    $u.Products.deleteRating({
      id : req.params.class,
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }
}
