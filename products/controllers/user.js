

const $c = require('../requesters/database');
const joi = require('joi')

/*
  classes user is student
  creator
  tailor
  viewer
*/


module.exports = class usersController{

  static creator(req, res){
    $c.Class.get({
      creator : req.params.user,
      limit : req.query.limit,
      skip : req.query.offset,
      login : req.login._id
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static product(req, res){
    $c.Class.get({
      product : true,
      limit : req.query.limit,
      skip : req.query.offset,
      login : req.login._id
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static viewer(req, res){
    $c.Class.get({
      viewed : true,
      limit : req.query.limit,
      skip : req.query.offset,
      login : req.login._id
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }
}
