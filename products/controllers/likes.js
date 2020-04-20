
const $d = require('../requesters/database');

module.exports = class likesController{
  static like(req, res){
    $d.Class.like({
      login : req.login._id,
      user : req.params.user,
      id : req.params.class
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err))
  }

  static unlike(req, res){
    $d.Class.unlike({
      login : req.login._id,
      user : req.params.user,
      id : req.params.class
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err))
  }

  static likes(req, res){
    $d.Class.likes({
      login : req.login._id,
      id : req.params.class,
      skip : parseInt(req.query.offset) || 0,
      limit : parseInt(req.query.limit) || 30
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err))
  }
}
