const joi = require('joi');
const $u = require('../requesters/database.user');
const Pub = require('../publishers/auth.publisher');
const mysql = require('mysql');


module.exports = class verificationController{
	

	
  static  generateCode(){
    let i = Math.ceil(Math.random() * 999999);
    return `${i}`.length < 6 ? Math.ceil(Math.random() * 9) + `${i}` : i;
  }

  static get refreshCodeSchema(){
    return joi.object().keys({
      email : joi.string().email().required()
    })
  }

  static refreshCode(req, res){
      $u.User.verification(req.body,{
        status : verificationController.generateCode()
      })
      .then(user =>  {
        res.json(user)
      }, err => res.status(400).json(err.toString()))
      .catch(err => res.status(500).json(err.toString()))
  }

  static get verifySchema(){
    return joi.object().keys({
      number : joi.number().min(0).max(999999).required()
    })
  }

  static verify(req, res){
    $u.User.verify(req.params.user, req.params.token).then(user =>  {
		  // res.json(user);
      res.redirect('http://142.93.207.91/activation-successful');
	  }, err => {
      console.log(err);
      res.status(400).json(err)
    }).catch(err => res.status(500).json(err.toString()))
  }
}
