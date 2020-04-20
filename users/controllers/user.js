

const $u  = require('../requesters/database.user')
const joi = require('joi');
const mysql = require('mysql');



let err = (res) => {
  return (status) => {
    return (err) => {
      console.log(err)
      res.status(status).json(status == 500 ? err.toString() : err);
    }
  }
}


module.exports = class userController{
	
	static migration(req, res){
		$u.User.doMigration(req.query.skip, req.query.limit).then(users => {
			
			res.json(users);
		}, err => {
			res.status(400).json(err);
		}).catch(err(res)(500))
	}


  static get followSchema(){
    return joi.object().keys({
      userid : joi.number().required(),
      data : joi.string().required()
    })
  }


  static follow(req, res){
    $u.User.followSeller(req.body.userid, req.body.data).then(user =>  {
      res.json(user);
    }, err => {
      console.log(err);
      res.status(400).json(err)
    }).catch(err => res.status(500).json(err.toString()))
  }

	
	static setBankInfoAsDefault(req, res){
		$u.User.setBankInfoAsDefault(req.params.user, req.params.bank, req.body).then(user => res.json(user), err(res)(400))
		.catch(err(res)(500))
	}
	
	static deleteBankInfo(req, res){
		$u.User.deleteBankInfo(req.params.user, req.params.bank).then(user => res.json(user), err(res)(400))
		.catch(err(res)(500))
	}
	
	static addBankInfo(req, res){
		$u.User.addBankInfo(req.params.user, {
			name: req.body.name,
			number : req.body.number,
			bank : req.body.bank,
			country : req.body.country,
			default: req.body.default
		}).then(user => res.json(user), err(res)(400))
		.catch(err(res)(500))
	}
	
	static get addBankInfoSchema(){
		return joi.object().keys({
			name : joi.string().required(),
			number : joi.string().required(),
			bank : joi.string().required(),
			country : joi.string().required(),
			default: joi.boolean()
		})
	}

	static findUser(req, res){
	  let user = req.params.user;
      $u.User.findOneOrFail({
		id: user
      }).then(users => {
		  if(users == null){
			  $u.User.find({
				fullname: user
			  }).then(user => {
				  res.json(user)
			  });
		  }else{
			res.json(users)
		  }
	  },
      err(res)(400))
     .catch(err(res)(500))
	}
	
  static get(req, res){
      $u.User.get({
        search : req.query.search,
        limit : req.query.limit,
        skip : req.query.offset,
      })
      .then(users => res.json(users),
      err(res)(400))
     .catch(err(res)(500))
  }
  
	static fetch(req, res){
      $u.User.find()
      .then(users => res.json(users),
      err(res)(400))
     .catch(err(res)(500))
  }

  static myinfo(req, res){
    $u.User.getById({id : req.params.user})      
     .then((user) => {
      res.json(user)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static userdashboard(req, res){
    $u.User.dashboardinfo({userid : req.params.user})      
     .then((user) => {
      var ress = user.reduce(function(obj, v) {
        obj[v.source] = (obj[v.source] || 0) + 1;
        return obj;
      }, {})
      res.json(ress)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

   static get createTransactionSchema(){
      return joi.object().keys({
        userid:joi.number().required(),
        full_name:joi.string().required(),
        email:joi.string().required(),
        amount:joi.number().required(),
        reference:joi.string(),
        source:joi.string(),
        custId:joi.number().required(),
        paymentCode:joi.string().required(),
        phone: joi.string().required(),
        reference1:joi.string().required(),
        trans:joi.string().required(),
        status:joi.string().required(),
        message:joi.string().required(),
        transaction:joi.string().required(),
        trxref:joi.string().required()
      })
    }

    static PostTransaction(req, res){
      $u.User.createTransaction(req.body)
      .then(data =>  {res.json(data)}, err => res.status(400).json(err))
      .catch(err => res.status(500).json(err.toString()))
    }


  static countries(req, res){
    $u.User.countries({})
    .then(countries => res.json(countries),
    err(res)(400))
    .catch(err(res)(500))
  }

  static singlecountry(req, res){
    $u.Country.findOne({
      _id:req.body.id
    })
    .then(country => res.json(country), err(res)(400))
    .catch(err(res)(500))
  }

  static profile(req, res){
    $u.User.getById(req.params.user)
    .then(user => res.json(user),
    err(res)(400))
   .catch(err(res)(500))
  }


  static get updateSchema(){
    return joi.object().keys({
      fullname : joi.string(),
      email : joi.string().email().lowercase(),
      phone : joi.string(),
      bio : joi.string().allow('', null),
      gender : joi.string().allow('', null),
      dob : joi.date().allow('', null),
      rcountry : joi.string().allow('', null),
      ocountry : joi.string().allow('', null),
      alternate_phone : joi.string().allow('', null),
      account : {
        name : joi.string().allow('', null),
        number : joi.number().allow('', null),
        bank : joi.string().allow('', null),
        country : joi.string().allow('', null)//must align with those countries in DB
      }
    })
  }

	static get updateSchema2(){
		return joi.object().keys({
			fullname : joi.string(),
			email : joi.string().email().lowercase(),
			phone : joi.string(),
			bio : joi.string().allow('', null),
			gender : joi.string().allow('', null),
			dob : joi.date().allow('', null),
			rcountry : joi.string().allow('', null),
			ocountry : joi.string().allow('', null),
			alternate_phone : joi.string().allow('', null),
			accountname: joi.string().allow('', null),
			accountnumber: joi.string().allow('', null),
			bankname: joi.string().allow('', null),
			bankcountry: joi.string().allow('', null),
			office_address: joi.string().allow('', null),
			brandname: joi.string().allow('', null),
			tailor: {
				active: joi.boolean(),
				brandname: joi.string(),
				address: joi.string()
			}
		})
	}
	 
	static update3(req, res){
		$u.User.updateUser(req.params.user, req.body).then(data => {
			res.status(200).json(data);
		}, error => {
			res.status(400).json(error);
		}).catch(err => { res.status(500).json(err)})
	}
  
  static update(req, res){
  	// console.log(JSON.stringify(req.body));
      $u.User.updateUser(req.params.user, {...req.body})
      .then(user => {
  		  res.json(user)
  	}, err(res)(400))
      .catch(err(res)(500))
  }
  
  
  static update2(req, res){
	console.log(JSON.stringify(req.body));
    $u.User.updateUser(req.params.user, {...req.body, ...(req.files ? Object.entries(req.files).reduce((acc, [key, [{filename}]]) => Object.assign(acc, {[key] : filename}), {}) : {}) })
    .then(user => {
		var picture = "https://ik.imagekit.io/nugitech/users/"+user.pictureURL;
		var query = "UPDATE pxp_users SET avatar = '" + picture + "' WHERE clientID = '"+ user._id + "'";	
		userController.insertMysql(query);
		res.json(user)
	}, err(res)(400))
    .catch(err(res)(500))
  }
  
  static insertMysql(query){
	mySqlConnection.query(query, function (err, result){
		if (err) throw err;
	})
	//mySqlConnection.end();
  }

  static get changePasswordSchema(){
    return joi.object().keys({
      password : joi.string().required(),
      newPassword : joi.string().required()
    })
  }

  static changePassword(req, res){
    console.log(req.body);
    $u.User.changePassword({id : req.login._id, ...req.body})
    .then(user => res.json(user),  err(res)(400))
    .catch(err(res)(500))
  }

  static updateToken(req, res){
    //how to auth user after login
    $u.User.updateToken(req.body)
    .then(login => res.json(login),  err(res)(400))
    .catch(err(res)(500))
  }

  static delete(req, res){
    $u.User.findOneAndRemove({id : req.params.id})
    .then(user => res.json(user),  err(res)(400))
    .catch(err(res)(500))
  }
}
