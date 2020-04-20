
const {mix} = require('mixwith')
const Sequelize = require("sequelize");
const db = require('../models').wallet;
const logs = require('../models').walletlog;
var crypto = require("crypto");


module.exports = class walletClass extends Sequelize.Model {
	
	static doLog(data){
		return db.create(data);
	}

	static saveTransaction(query){
  		return new Promise((resolve, reject) => {
            return Promise.all([
              logs.create(query),
            ])
          .then(resolve, reject)
          .catch(reject =>  console.log("i dont like it here -1"))
        })
  	}

	static get(user){
		return this.findOne({user: user});
	}

	static userTransactionLog({userid, login, ...query}){
      return logs.findAll({where: {userid: userid}})
    }    

    static getById({userid, login, ...query}){
      return db.findOne({where: {userid: userid}})
    }        


	static isIdUnique (wallet) {
	    return db.count({ where: { "walletid": wallet } })
	      .then(count => {
	        if (count != 0) {
	          return false;
	        }
	        return true;
	    });
	}

	static createWallet(){
		const id = crypto.randomBytes(20).toString('hex');
		this.isIdUnique(id).then(isUnique => {
		    if (isUnique) {
		        return id;
		    }
		    this.createWallet();
		});
	}

	static findOneAndUpdate(query, body){
	    return db.findOne({"where" : query}).then(usr => {
	      usr.update(body);
	      return usr.save();
	    })
	  }

	static fundOrDebitWallet(user, data, type, activity, amount){
		if(type === "NGN"){
			if(activity === "credit"){
				let newBal = data.ngn.currentBal + amount;
				return this.findOneAndUpdate({user: data.user}, {
						currentBal: newBal,
						previousBal: data.ngn.currentBal,
						lastUpsdated: new Date()
				})
			}else{				
				let newBal = data.ngn.currentBal - amount;
				return this.findOneAndUpdate({user: data.user}, {
						currentBal: newBal,
						previousBal: data.ngn.currentBal,
						lastUpdated: new Date()
				})
			}
		}else{
			if(activity === "credit"){
				let newBal = data.usd.currentBal + amount;
				return this.findOneAndUpdate({user: data.user}, {
						currentBal: newBal,
						previousBal: data.usd.currentBal,
						lastUpdated: new Date()
				})
			}else{
				let newBal = data.usd.currentBal - amount;
				return this.findOneAndUpdate({user: data.user}, {
						currentBal: newBal,
						previousBal: data.usd.currentBal,
						lastUpdated: new Date()
				})
			}
		}
	}
	
	static userTransactionsLog(user){
		return logs.findAll({
	        where:{"userid":user},
	        attributes: ['currentBal','previousBal','amount','currency','description','type','conversionRate','walletid','activity','payerId','transfer','currencyType']
	      }).then(function(logs){
	        res.send({error:false,message:'wallet logs',data:logs});
	      }).catch(function(err){
	        console.log('Oops! something went wrong, : ', err);
	      });
	}


	static findUser(user){
		return db.findOne({ "where": {
			"user": user
		}})
	}

	static activateWallet(user, country){ 
	  let currency = "NGN";
	  // let walletid = this.createWallet();
	  if(country === "NIGERIA")
		  currency = "NGN";
	  else
		  currency = "USD";
	
	  return this.create({
		  userid: user,
		  currentBal : 0,  
		  previousBal: 0,
		  currency: currency,
	   })
    }


	// static createWallet(){
	//   $u.Wallet.createWallet()
	//   .then(walletid => res.json(walletid))
	//   .err(res)(400)
	//   .catch(err(res)(500))
 //   }


	static initializeewallet(user){
		this.activateWallet(user.id, user.rcountry).then(wallet => {
		}, err => {
			res.status(500).json(err);
		}).catch(err(res)(500))
	}

	static findOne(query){
    	db.findOne({ "where": query });
  	}

  	static create(query){
  		return new Promise((resolve, reject) => {
            return Promise.all([
              db.create(query),
            ])
          .then(resolve, reject)
          .catch(reject =>  console.log("i dont like it here -1"))
        })
  	}
	
	static updateWallet(user, body){
		return this.findOneAndUpdate({user: user}, body);
	}
	
	static getAllWallets(user){
		return this.aggregate([
			{$lookup: {
				from: "WalletLog",
				localField: 'user',
				foreignField: 'user',
				as: 'walletLog'
			}},
		])
	}
}
