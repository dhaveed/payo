
const $c = require('../requesters/database');
const joi = require('joi')
const Config = require('../requesters/config');
const Classes = require('../controllers/products');


module.exports = class classController{
  
	static View(req, res){
		res.send("testing");
		/*	
		$c.Class.editClass({
		  id : req.params.class,
		  user : req.login._id
		},views : {_id: , user: req.login._id,time : new Date})
		.then(data => res.json(data), err => res.status(400).json(err))
		.catch(err => res.status(500).json(err.toString()))
		*/
	}
}
