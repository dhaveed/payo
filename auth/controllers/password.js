
const $u = require('../requesters/database.user');
const joi = require('joi');
const jwt = require('jsonwebtoken')
const Pub = require('../publishers/auth.publisher');
var request = require('request');


module.exports = class passwordController{

  static get resetKey(){
    return "TG@@rktfbermgs(@@)@@";
  }

  static generateCode(user){
    return new Promise((resolve, reject)=>{
      $u.User.findOneOrFail({
        email : user
      })
      .then(user => {
        resolve({user, token : jwt.sign({user : user.id},passwordController.resetKey, {expiresIn : 60 * 20})})
      }, reject)
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }

  static get requestTokenSchema(){
    return joi.object().keys({
      email : joi.string().email().required()
    })
  }

  static requestToken(req, res){
    passwordController.generateCode(req.body.email)
    .then((code) => {
      $u.User.findOneOrFail({
        email: req.body.email
      })
      .then((usr) => {
        console.log(code.token);
        request.get("http://142.93.207.91/tdxmailer/reset.php?"+"email="+usr.email+"&id="+usr.id+"&fullname="+usr.firstname + " " + usr.lastname+"&token="+code.token, function(error_, response_, body_){
          console.log(body_);
          if(body_ == 1 || body_ == "1"){
            res.json("We've sent an email to "+usr.email+". Kindly follow the instructions to reset your password")
          }else{
            res.status(500).json(error_)
          }
        })
      })
    }, (err) => res.status(400).json(false))
    .catch(err => res.status(500).json(err.toString()))
  }

  static checkToken(code){
    //time added shouldnt be above 20 minutes and user exist
    return new Promise((resolve, reject)=> {
      jwt.verify(code, passwordController.resetKey, function(err, decoded){
        if(err) return reject(err)
        $u.User.findOneOrFail({
          id : decoded.user
        })
        .then(user => {
          resolve({user, token : decoded})
        }, reject)
        .catch(err => {
          reject(err)
        })
      })
    })
  }

  static verifyToken(req, res){
    passwordController.checkToken(req.params.token)
    .then(data => res.json(data), err => res.status(400).json(err.toString() || err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static get resetPasswordSchema(){
    return joi.object().keys({
      email : joi.string().email().required(),
      password : joi.string().min(6).max(32).required()
    })
  }

  static resetPassword(req, res){
	 console.log("Hello from reset password")
	 console.log(req.params.token);
    passwordController.checkToken(req.params.token)
    .then( ({user, token}) => {
      return $u.User.resetPassword({email : user.email}, req.body.password)
    }, err => res.status(400).json(err.toString() || err))
    .then(user => res.json(user),  err => res.status(400).json(err.toString()))
    .catch(err => res.status(500).json(err.toString()))
  }
}
