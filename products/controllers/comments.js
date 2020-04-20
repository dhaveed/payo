
const $c = require('../requesters/database');
const joi = require('joi')


module.exports = class classController{
  static getold(req, res){
    $c.Products.allComments({
      id : req.params.contents
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  } 

  static getOnePComment(req, res){
    $c.Products.getcommentForProduct({"pid": req.params.productid, "deleted" : 0})
    .then(comments => {
        res.json(comments)
    }, err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }


  static getproductComment(req, res){
    $c.Products.allComments({"deleted" : 0})
    .then(([comments]) => {
    $c.Products.getById({id : comments.pid})
    .then(product =>  {
        res.json(Object.assign(product, comments))
      }, err => {
          res.json(Object.assign(err))
      }).catch(err => res.json(Object.assign(err.toString())))
    
    }, err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }
  
  static get(req, res){
    $c.Products.allComments({"deleted" : 0})
    .then(comments => {
        res.json(comments)
    }, err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static get createSchema(){
    return joi.object().keys({
      user : joi.string().alphanum().length(24).required(),
      comment : joi.string().required()
    })
  }

  static create(req, res){
    //if no sub, remove amount and currency
    $c.Products.comment(req.params.class, req.body)
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static delete(req, res){
    $c.Products.deleteComment({
      id : req.params.content,
      comment : req.params.comment,
      user : req.login._id
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static get updateSchema(){
    return joi.object().keys({
      comment : joi.string().required(),
    })
  }

  static update(req, res){
    $c.Products.editClass({
      id : req.params.class,
      user : req.login._id
    },req.body)
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

}
