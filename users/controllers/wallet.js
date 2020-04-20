
const $u = require('../requesters/database.user');
const Pub = require('../publishers/user.publisher');
const joi = require('joi');
const axios = require('axios');

let err = (res) => {
  return (status) => {
    return (err) => {
      console.log(err)
      res.status(status).json(status == 500 ? err.toString() : err);
    }
  }
}

module.exports = class walletController{
	
	
	static searchTailor(req, res){
		$u.User.searchUser({
			search : req.query.search,
			limit : req.query.limit,
			skip : req.query.offset,
		  })
		  .then(users => res.json(users),
		  err(res)(400))
		 .catch(err(res)(500))
	}
		
	static getwallet(req, res){
	    $u.Wallet.getById({userid : req.params.user})      
	     .then((user) => {
	      res.json(user)
	    })
	    .catch(err => {
	      res.status(500).json(err.toString())
	    })
	  }

	 static userTransactionLog(req, res){
	    $u.Wallet.userTransactionLog({userid : req.params.user})      
	     .then((usertlog) => {
	      res.json(usertlog)
	    })
	    .catch(err => {
	      res.status(500).json(err.toString())
	    })
  	}

	static disabledTransfer(req, res){
		walletController.findTailor(req.params.receiver).then(data => {
			if(data !== null){
				$u.Wallet.findOne({user: req.params.user}).then(wallet => {
					if(wallet == null)
						res.status(400).json({"message": "Insufficient fund"});
					if(req.body.currency === "USD"){
						axios.get('https://market.tailorgang.io/wp-content/currency_.json')
						.then(function (response) {
							let amountInNGN = req.body.amount * response.data.rates.NGN;
							let amountInUSD = req.body.amount;
							
							if(amountInUSD > wallet.usd.currentBal)
								res.status(400).json({message: "Insufficient fund"});
							if(amountInNGN > wallet.ngn.currentBal)
								res.status(400).json({message: "Insufficient fund"});
							
							Promise.all([
								$u.Wallet.fundOrDebitWallet(req.params.user, wallet, "USD", "debit", amountInUSD),
								$u.Wallet.fundOrDebitWallet(req.params.user, wallet, "NGN", "debit", amountInNGN)
							]).then(([usd, ngn]) => {
								$u.WalletLog.doLog({
									user: req.params.user,
									wallet: usd._id,
									currencyType: req.body.currency,
									currency: [
										{
											type: "NGN",
											currentBal: ngn.ngn.currentBal,
											previousBal: ngn.ngn.previousBal,
											conversionRate: response.data.rates.NGN
										},
										{
											type: "USD",
											currentBal: usd.usd.currentBal,
											previousBal: usd.usd.previousBal,
											conversionRate: 0
										}
									],
									description: req.body.description,
									amount: req.body.amount,
									activity: "debit",
									payerId: req.body.payerId
								}).then(log => {
									res.json(log);
								}, err => {
									res.status(400).json(err);
								}).catch(err(res)(500));
							}, err(res)(400)).catch(err(res)(500))
						}, err(res)(400)).catch(err(res)(500))
					}
			
					if(req.body.currency === "NGN"){
						axios.get('http://localhost:9000/country.json')
						.then(function (response) {
							let amountInUSD = req.body.amount * response.data.rates.USD;
							let amountInNGN = req.body.amount;
							
							if(amountInUSD > wallet.usd.currentBal)
								res.status(400).json({message: "Insufficient fund"});
							if(amountInNGN > wallet.ngn.currentBal)
								res.status(400).json({message: "Insufficient fund"});
							
							Promise.all([
								$u.Wallet.fundOrDebitWallet(req.params.user, wallet, "USD", "debit", amountInUSD),
								$u.Wallet.fundOrDebitWallet(req.params.user, wallet, "NGN", "debit", amountInNGN)
							]).then(([usd, ngn]) => {
								$u.WalletLog.doLog({
									user: req.params.user,
									wallet: usd._id,
									currency: [
										{
											type: "NGN",
											currentBal: ngn.ngn.currentBal,
											previousBal: ngn.ngn.previousBal,
											conversionRate: 0
										},
										{
											type: "USD",
											currentBal: usd.usd.currentBal,
											previousBal: usd.usd.previousBal,
											conversionRate: response.data.rates.USD
										}
									],
									description: req.body.description,
									amount: req.body.amount,
									activity: "debit",
									payerId: req.body.payerId,
									currencyType: req.body.currency
								}).then(log => {
									res.json(log);
								}, err => {
									res.status(400).json(err);
								}).catch(err(res)(500));
							}, err(res)(400)).catch(err(res)(500))
						}, err(res)(400)).catch(err(res)(500))	
					}
		
					
					
				}, err => {
					res.status(400).json(err);
				}).catch(err(res)(500))
			}else{
				res.status(400).json({"message": "You can only tranfer funds to a tailor"});
			}
		}, err => {
			res.status(400).err(err);
		}).catch(err(res)(500))
	}
	
	static findTailor(user){
		return $u.User.findOne({
			_id: user,
			tailor : {$ne : null}
		})
	}
	
	static verifyTransfer(user, amount){
		if(type === "ngn"){
			return $u.Wallet.findOne({
				user: user,
				'ngn.currentBal': {$gte: amount}
			})
		}else{
			return $u.Wallet.findOne({
				user: user,
				'usd.currentBal': {$gte: amount}
			})
		}
	}
	


	
	static get(req, res){
		$u.Wallet.getById({"userid" : req.params.user})
		.then(user => res.json(user),
		err(res)(400))
	   .catch(err(res)(500))
	}	
	
	static createWallet(){
		$u.Wallet.createWallet()
		.then(walletid => res.json(walletid))
		.err(res)(400)
		.catch(err(res)(500))
	}

	  static get savetransactionSchema(){
	    return joi.object().keys({
		    userid:joi.number().required(),
			currentBal:joi.number().required(),
			previousBal:joi.number().required(),
			amount:joi.number().required(),
			currency:joi.string().required(),
			description:joi.string().required(),
			type:joi.string().required(),
			conversionRate:joi.string().required(),
			walletid:joi.string().required(),
			activity:joi.string().required(),
			transfer:joi.boolean(),
	    })
	  }


// {
// 			"userid": req.params.user,
// 			"currentBal" : req.params.currentBal,  
// 			"previousBal": req.params.previousBal,
// 			"amount": req.params.amount,
// 			"currency": req.params.currency,
// 			"description": req.params.description,
// 			"type": req.params.type,
// 			"conversionRate": req.params.conversionRate,
// 			"walletid": req.params.walletid,
// 			"activity": req.params.activity,
// 			"payerId": req.params.user,
// 			"transfer": req.params.transfer,
// 			"currencyType": req.params.currency
// 		}

	static savetransaction(req, res){
		$u.Wallet.saveTransaction(req.body).then(data => res.json(data),
		err(res)(400))
	   .catch(err(res)(500))
	}

	static activateWallet(req, res){ 
		let currency = "NGN";
		let user = req.params.user;
		// let walletid = this.createWallet();
		const country = "NIGERIA";
		
		$u.Wallet.create({
			userid: user,
			currentBal : 0,  
			previousBal: 0,
			currency: currency,
		}).then(data => res.json(data),
		err(res)(400))
	   .catch(err(res)(500))
	}
	
	static debitWalletDisable(req, res){
		$u.Wallet.findUser(req.params.user).then(wallet => {
			if(wallet !== null){
				if(req.body.type === "ngn"){
					if(req.body.amount <= wallet.ngn.currentBal){
						$u.Wallet.fundOrDebitWallet(
						req.params.user, wallet, req.body.type, 
						"debit", req.body.amount).then(data => {
							let cb = data.ngn.currentBal;
							let pb = data.ngn.previousBal;
							if(req.body.type == "usd"){
								cb = data.usd.currentBal;
								pb = data.usd.previousBal;
							}
							$u.WalletLog.doLog({
								user: data.user,
								wallet: data._id,
								type: req.body.type,
								description: req.body.description,
								amount: req.body.amount,
								currentBal: cb,
								previousBal: pb,
								activity: "debit",
								payerId: req.body.payerId
							}).then(log => {
								res.json(data);
							}, err => {
								res.status(400).json(err);
							}).catch(err(res)(500));
						}, err => {
							res.status(400).json(err);
						}).catch(err(res)(500))
					}else{
						res.status(400).json({"message": "Transaction declined"})
					}
				}else{
					if(req.body.amount <= wallet.usd.currentBal){
						$u.Wallet.fundOrDebitWallet(req.params.user, wallet, req.body.type, "credit", req.body.amount).then(data => {
						let cb = data.ngn.currentBal;
						let pb = data.ngn.previousBal;
						if(req.body.type == "usd"){
							cb = data.usd.currentBal;
							pb = data.usd.previousBal;
						}
						$u.WalletLog.doLog({
							user: data.user,
							wallet: data._id,
							type: req.body.type,
							description: req.body.description,
							amount: req.body.amount,
							currentBal: cb,
							previousBal: pb,
							activity: "debit",
							payerId: req.body.payerId
						}).then(log => {
							res.json(data);
						}, err => {
							res.status(400).json(err);
						}).catch(err(res)(500));
						
					}, err => {
						res.status(400).json(err);
					}).catch(err(res)(500))
					}else{
						res.status(400).json({"message": "Transaction declined"})
					}
				}
			}
		}, err => {
				res.status(400).json(err);
		}).catch(err(res)(500))
	}
		
	
	static fundWallet(req, res){
		$u.Wallet.findUser(req.params.user).then(data => {
			if(data === null){
				$u.User.findOne({
					id: req.params.user
				}).then(user => {
					walletController.activateWallet(req.params.user, user.rcountry).then(wallet => {
						if(req.body.currency === "USD"){
							axios.get('http://localhost:9000/country.json')
							.then(function (response) {
								console.log(response);
								let amountInNGN = req.body.amount * response.data.rates.NGN;
								let amountInUSD = req.body.amount;
								Promise.all([
									$u.Wallet.fundOrDebitWallet(req.params.user, wallet, "NGN", "credit", amountInNGN)
								]).then(([ngn]) => {
									$u.Wallet.doLog({
										userid:req.params.user,
										currentBal:ngn.currentBal,
										previousBal:ngn.previousBal,
										amount:req.body.amount,
										currency:req.body.currency,
										description:req.body.description,
										type:"NGN",
										conversionRate:response.data.rates.NGN,
										walletid:ngn.walletid,
										activity:"credit",
										payerId:req.body.payerId,
										transfer:false,
										currencyType:req.body.currency
									}).then(log => {
										res.json(log);
									}, err => {
										res.status(400).json(err);
									}).catch(err(res)(500));
									
								}, err(res)(400)).catch(err(res)(500))
							}, err(res)(400)).catch(err(res)(500))
						}
						
						if(req.body.currency === "NGN"){
							axios.get('http://localhost:9000/country.json')
							.then(function (response) {
								let amountInUSD = req.body.amount * response.data.rates.USD;
								let amountInNGN = req.body.amount;
								
								Promise.all([
									$u.Wallet.fundOrDebitWallet(req.params.user, wallet, "NGN", "credit", amountInNGN)
								]).then(([ngn]) => {
									$u.WalletLog.doLog({
										userid:req.params.user,
										currentBal:ngn.ngn.currentBal,
										previousBal:ngn.ngn.previousBal,
										amount:req.body.amount,
										currency:req.body.currency,
										description:req.body.description,
										type:"NGN",
										conversionRate:response.data.rates.NGN,
										walletid:ngn.walletid,
										activity:"credit",
										payerId:req.body.payerId,
										transfer:false,
										currencyType:req.body.currency
									}).then(log => {
										res.json(log);
									}, err => {
										res.status(400).json(err);
									}).catch(err(res)(500));
								}, err(res)(400)).catch(err(res)(500))
							}, err(res)(400)).catch(err(res)(500))	
						}
					}, err => {
						res.status(500).json(err);
					}).catch(err(res)(500))
					
				}, err(res)(400)).catch(err(res)(500))
			}else{
				$u.Wallet.findUser(req.params.user).then(wallet => {
					if(req.body.currency === "USD"){
						axios.get('http://localhost:9000/country.json')
						.then(function (response) {
							console.log(req.body);
							let amountInNGN = req.body.amount * response.data.rates.NGN;
							let amountInUSD = req.body.amount;
							Promise.all([
								$u.Wallet.fundOrDebitWallet(req.params.user, wallet, "NGN", "credit", amountInNGN)
							]).then(([ngn]) => {
								$u.WalletLog.doLog({
									userid:req.params.user,
									currentBal:ngn.currentBal,
									previousBal:ngn.previousBal,
									amount:req.body.amount,
									currency:req.body.currency,
									description:req.body.description,
									type:"NGN",
									conversionRate:response.data.rates.NGN,
									walletid:ngn.walletid,
									activity:"credit",
									payerId:req.body.payerId,
									transfer:false,
									currencyType:req.body.currency
								}).then(log => {
									res.json(log);
								}, err => {
									res.status(400).json(err);
								}).catch(err(res)(500));
								
							}, err(res)(400)).catch(err(res)(500))
						}, err(res)(400)).catch(err(res)(500))
					}
					
					if(req.body.currency === "NGN"){
						axios.get('http://localhost:9000/country.json')
						.then(function (response) {
							let amountInUSD = req.body.amount * response.data.rates.USD;
							let amountInNGN = req.body.amount;
							Promise.all([
								$u.Wallet.fundOrDebitWallet(req.params.user, wallet, "NGN", "credit", amountInNGN)
							]).then(([ngn]) => {
								$u.WalletLog.doLog({
									userid:req.params.user,
									currentBal:ngn.ngn.currentBal,
									previousBal:ngn.ngn.previousBal,
									amount:req.body.amount,
									currency:req.body.currency,
									description:req.body.description,
									type:"NGN",
									conversionRate:response.data.rates.NGN,
									walletid:ngn.walletid,
									activity:"credit",
									payerId:req.body.payerId,
									transfer:false,
									currencyType:req.body.currency
								}).then(log => {
									res.json(log);
								}, err => {
									res.status(400).json(err);
								}).catch(err(res)(500));
							}, err(res)(400)).catch(err(res)(500))
						}, err(res)(400)).catch(err(res)(500))	
					}
				}, err => {
					res.status(400).json(err);
				}).catch(err(res)(500))
			}
		}, err => {
			res.status(400).json(err);
		}).catch(err(res)(500))
	}
	
	
	static debitWallet(req, res){
		$u.Wallet.findUser(req.params.user).then(wallet => {
			
			if(req.body.currency === "USD"){
				axios.get('http://localhost:9000/country.json')
				.then(function (response) {
					let amountInNGN = req.body.amount * response.data.rates.NGN;
					let amountInUSD = req.body.amount;
					
					if(amountInNGN > wallet.currentBal)
						res.status(400).json({message: "Insufficient fund"});
					
					Promise.all([
						$u.Wallet.fundOrDebitWallet(req.params.user, wallet, "NGN", "debit", amountInNGN)
					]).then(([ngn]) => {
						$u.WalletLog.doLog({
							userid:req.params.user,
							currentBal:ngn.ngn.currentBal,
							previousBal:ngn.ngn.previousBal,
							amount:req.body.amount,
							currency:req.body.currency,
							description:req.body.description,
							type:"NGN",
							conversionRate:response.data.rates.NGN,
							walletid:ngn.walletid,
							activity:"credit",
							payerId:req.body.payerId,
							transfer:false,
							currencyType:req.body.currency
						}).then(log => {
							res.json(log);
						}, err => {
							res.status(400).json(err);
						}).catch(err(res)(500));
					}, err(res)(400)).catch(err(res)(500))
				}, err(res)(400)).catch(err(res)(500))
			}
			
			if(req.body.currency === "NGN"){
				axios.get('http://localhost:9000/country.json')
				.then(function (response) {
					let amountInNGN = req.body.amount * response.data.rates.NGN;
					let amountInUSD = req.body.amount;
					
					if(amountInNGN > wallet.currentBal)
						res.status(400).json({message: "Insufficient fund"});
					
					Promise.all([
						$u.Wallet.fundOrDebitWallet(req.params.user, wallet, "NGN", "debit", amountInNGN)
					]).then(([ngn]) => {
						$u.WalletLog.doLog({
							userid:req.params.user,
							currentBal:ngn.ngn.currentBal,
							previousBal:ngn.ngn.previousBal,
							amount:req.body.amount,
							currency:req.body.currency,
							description:req.body.description,
							type:"NGN",
							conversionRate:response.data.rates.NGN,
							walletid:ngn.walletid,
							activity:"credit",
							payerId:req.body.payerId,
							transfer:false,
							currencyType:req.body.currency
						}).then(log => {
							res.json(log);
						}, err => {
							res.status(400).json(err);
						}).catch(err(res)(500));
					}, err(res)(400)).catch(err(res)(500))
				}, err(res)(400)).catch(err(res)(500))
			}
		
		}, err => {
			res.status(400).json(err);
		}).catch(err(res)(500))
	}
	
	
	static doTransfer(req, res){
		$u.Wallet.findUser(req.params.user).then(wallet => {
			
			if(req.body.currency === "USD"){
				axios.get('http://localhost:9000/country.json')
				.then(function (response) {
					let amountInNGN = req.body.amount * response.data.rates.NGN;
					let amountInUSD = req.body.amount;
					
				
					if(amountInNGN > wallet.currentBal)
						res.status(400).json({message: "Insufficient fund"});
					
					Promise.all([
						$u.Wallet.fundOrDebitWallet(req.params.user, wallet, "NGN", "debit", amountInNGN)
					]).then(([ngn]) => {
						$u.WalletLog.doLog({
							userid:req.params.user,
							currentBal:ngn.ngn.currentBal,
							previousBal:ngn.ngn.previousBal,
							amount:req.body.amount,
							currency:req.body.currency,
							description:req.body.description,
							type:"NGN",
							conversionRate:response.data.rates.NGN,
							walletid:ngn.walletid,
							activity:"credit",
							payerId:req.body.payerId,
							transfer:false,
							currencyType:req.body.currency
						}).then(log => {
							res.json(log);
						}, err => {
							res.status(400).json(err);
						}).catch(err(res)(500));
					}, err(res)(400)).catch(err(res)(500))
				}, err(res)(400)).catch(err(res)(500))
			}
			
			if(req.body.currency === "NGN"){
				axios.get('http://localhost:9000/country.json')
				.then(function (response) {
					let amountInUSD = req.body.amount * response.data.rates.USD;
					let amountInNGN = req.body.amount;
					
					if(amountInNGN > wallet.ngn.currentBal)
						res.status(400).json({message: "Insufficient fund"});
					
					Promise.all([
						$u.Wallet.fundOrDebitWallet(req.params.user, wallet, "NGN", "debit", amountInNGN)
					]).then(([usd, ngn]) => {
						$u.WalletLog.doLog({
							userid:req.params.user,
							currentBal:ngn.ngn.currentBal,
							previousBal:ngn.ngn.previousBal,
							amount:req.body.amount,
							currency:req.body.currency,
							description:req.body.description,
							type:"NGN",
							conversionRate:response.data.rates.NGN,
							walletid:ngn.walletid,
							activity:"credit",
							payerId:req.body.payerId,
							transfer:false,
							currencyType:req.body.currency
						}).then(log => {
							res.json(log);
						}, err => {
							res.status(400).json(err);
						}).catch(err(res)(500));
					}, err(res)(400)).catch(err(res)(500))
				}, err(res)(400)).catch(err(res)(500))	
			}
		
		}, err => {
			res.status(400).json(err);
		}).catch(err(res)(500))
	}
	
	/*
	axios.get('http://localhost:9000/country.json').then(function (response) {
		console.log(response.data.rates)
		res.json(response);
	  }, function(err){
		  
	  }).catch(function (error) {
		res.status(500).json(error);
	  });
	*/
	
	static get fundWalletSchema(){
		return joi.object().keys({
			amount: joi.number().required(),
			description: joi.string(),
			currency: joi.string().required(),
			payerId: joi.string().required()
		})
	}
	
	static getAllWallets(req, res){
		$u.Wallet.getAllWallets(req.params.user).then(data => {
			res.json(data);
		}, err => {
			res.status(400).json(err);
		}).catch(err(res)(500))
	}
	
	static get debitSchema(){
		return joi.object().keys({
			amount: joi.number().required(),
			currency: joi.string(),
			description: joi.string()
		})
	}

		
	
	static fundWalletSchema(){
		
	}
	

	static debitWallet(req, res){
		$u.Gwallet.findWallet(req.params.user).then(wallet => {
			if(wallet !== null){
				if(req.body.amount <= wallet.currentBal){
					$u.Gwallet.debit(req.params.user, wallet, req.body.amount).then(data => {
						let cb = data.currentBal;
						let pb = data.previousBal;
						$u.GwalletLog.doLog({
							user: data.user,
							wallet: data._id,
							description: req.body.description,
							amount: req.body.amount,
							currentBal: cb,
							previousBal: pb,
							activity: "debit",
							payerId: req.body.payerId
						}).then(log => {
							res.json(data);
						}, err => {
							res.status(400).json(err);
						}).catch(err(res)(500));
					}, err => {
						res.status(400).json(err);
					}).catch(err(res)(500))
				}else{
					res.status(400).json({"message": "Transaction declined"})
				}
			}else{
				res.status(400).json({"message": "User not found"})
			}
		}, err => {
				res.status(400).json(err);
		}).catch(err(res)(500))
	}
	
	static userTransactionsLog(req, res){
		$u.Wallet.userTransactionsLog(req.params.user)
		.then(data => res.json(data),
		err(res)(400))
	   .catch(err(res)(500))
	}
	
	static fundWallet(req, res){
		let currency = "";
		$u.User.findOne({
			_id: req.params.user
		}).then(user => {
			if(user.rcountry === "NG")
				currency = "ngn";
			if(user.rcountry == "US")
				currency = "usd";
			
			if(user){
				$u.Gwallet.findWallet(user._id).then(data => {
					if(data === null){
						let a = {
							currentBal : 0,  
							previousBal: 0, 
							lastUpdated: new Date(),
							currency: currency,
							user: req.params.user
						}
						$u.Gwallet.createNew(req.params.user, a)
						.then(data => {
							$u.Gwallet.findOne({
								user: req.params.user
							}).then(user => {
								let previousBal = user.currentBal;
								if(req.body.currency === user.currency){
									let cb = user.currentBal + req.body.amount;
									$u.Gwallet.fundWallet(req.params.user, {
										currentBal: cb,
										previousBal: previousBal
									}).then(data => {
										$u.GwalletLog.doLog({
											user: data.user,
											wallet: data._id,
											description: req.body.description,
											amount: req.body.amount,
											currentBal: data.currentBal,
											previousBal: data.previousBal,
											activity: "credit",
											payerId: req.body.payerId,
											fromCurrency: req.body.currency,
											toCurrency: user.currency,
											conversionRate: 0
										}).then(data => {
											res.json(data);
										}, err(res)(400)).catch(err(res)(500));
									},err(res)(400))
									.catch(err(res)(500));
									
								}else if(req.body.currency === "ngn" && user.currency === "usd"){
									axios.get('http://localhost:9000/country.json').then(function (response) {
										let amount = req.body.amount * response.data.rates.USD;
										
										let cb = user.currentBal + amount;
										$u.Gwallet.fundWallet(req.params.user, {
											currentBal: cb,
											previousBal: previousBal
										}).then(data => {
											$u.GwalletLog.doLog({
												user: data.user,
												wallet: data._id,
												description: req.body.description,
												amount: req.body.amount,
												currentBal: data.currentBal,
												previousBal: data.previousBal,
												activity: "credit",
												payerId: req.body.payerId,
												fromCurrency: req.body.currency,
												toCurrency: req.body.currency,
												conversionRate: response.data.rates.USD
											}).then(data => {
												res.json(data);
											}, err(res)(400)).catch(err(res)(500));
										},err(res)(400))
										.catch(err(res)(500));

									  }, function(err){
										  
									}).catch(function (error) {
										res.status(500).json(error);
									});
								}else if(req.body.currency === "usd" && user.currency === "ngn"){
									axios.get('https://market.tailorgang.io/wp-content/currency_.json').then(function (response) {
										let amount = req.body.amount * response.data.rates.NGN;
										let cb = user.currentBal + amount;
										$u.Gwallet.fundWallet(req.params.user, {
											currentBal: cb,
											previousBal: previousBal
										}).then(data => {
											$u.GwalletLog.doLog({
												user: data.user,
												wallet: data._id,
												description: req.body.description,
												amount: req.body.amount,
												currentBal: data.currentBal,
												previousBal: data.previousBal,
												activity: "credit",
												payerId: req.body.payerId,
												fromCurrency: req.body.currency,
												toCurrency: user.currency,
												conversionRate: response.data.rates.NGN
											}).then(data => {
												res.json(data);
											}, err(res)(400)).catch(err(res)(500));
										},err(res)(400))
										.catch(err(res)(500));
									
									}, function(err){
									  
									}).catch(function (error) {
										res.status(500).json(error);
									});
								}else{
									
								}
							},err=> {
								
							}).catch(err => {
								 
							})
							
						},err => { }).catch(err => { })
					}else{
						
						$u.Gwallet.findOne({
							user: req.params.user
						}).then(user => {
							let previousBal = user.currentBal;
							if(req.body.currency === user.currency){
								let cb = user.currentBal + req.body.amount;
								console.log(user);
								$u.Gwallet.fundWallet(req.params.user, {
									currentBal: cb,
									previousBal: previousBal
								}).then(data => {
									$u.GwalletLog.doLog({
										user: data.user,
										wallet: data._id,
										description: req.body.description,
										amount: req.body.amount,
										currentBal: data.currentBal,
										previousBal: data.previousBal,
										activity: "credit",
										payerId: req.body.payerId,
										fromCurrency: req.body.currency,
										toCurrency: user.currency,
										conversionRate: 0
									}).then(data => {
										res.json(data);
									}, err(res)(400)).catch(err(res)(500));
								},err(res)(400))
								.catch(err(res)(500));
								
							}else if(req.body.currency === "ngn" && user.currency === "usd"){
								axios.get('http://localhost:9000/country.json').then(function (response) {
									let amount = req.body.amount * response.data.rates.USD;
									
									let cb = user.currentBal + amount;
									$u.Gwallet.fundWallet(req.params.user, {
										currentBal: cb,
										previousBal: previousBal
									}).then(data => {
										$u.GwalletLog.doLog({
											user: data.user,
											wallet: data._id,
											description: req.body.description,
											amount: req.body.amount,
											currentBal: data.currentBal,
											previousBal: data.previousBal,
											activity: "credit",
											payerId: req.body.payerId,
											fromCurrency: req.body.currency,
											toCurrency: req.body.currency,
											conversionRate: response.data.rates.USD
										}).then(data => {
											res.json(data);
										}, err(res)(400)).catch(err(res)(500));
									},err(res)(400))
									.catch(err(res)(500));

								  }, function(err){
									  
								}).catch(function (error) {
									res.status(500).json(error);
								});
							}else if(req.body.currency === "usd" && user.currency === "ngn"){
								axios.get('https://market.tailorgang.io/wp-content/currency_.json').then(function (response) {
									let amount = req.body.amount * response.data.rates.NGN;
									let cb = user.currentBal + amount;
									$u.Gwallet.fundWallet(req.params.user, {
										currentBal: cb,
										previousBal: previousBal
									}).then(data => {
										$u.GwalletLog.doLog({
											user: data.user,
											wallet: data._id,
											description: req.body.description,
											amount: req.body.amount,
											currentBal: data.currentBal,
											previousBal: data.previousBal,
											activity: "credit",
											payerId: req.body.payerId,
											fromCurrency: req.body.currency,
											toCurrency: user.currency,
											conversionRate: response.data.rates.NGN
										}).then(data => {
											res.json(data);
										}, err(res)(400)).catch(err(res)(500));
									},err(res)(400))
									.catch(err(res)(500));
								
								}, function(err){
								  
								}).catch(function (error) {
									res.status(500).json(error);
								});
							}else{
								
							}
						},err=> {
						}).catch(err => {
							 
						})
					}
				},err => {
					res.status(400).json(err)
				}).catch(err => {
					res.status(500).json(err);
				})
			}else{
				res.status(400).json({"message": "User not found"})
			}
		},err=> {
		}).catch(err => {
		})
	}
	
	static get fundWalletSchema(){
		return joi.object().keys({
			amount: joi.number().required(),
			description: joi.string(),
			currency: joi.string().required(),
			payerId: joi.string().required()
		})
	}
	
	static get debitSchema(){
		return joi.object().keys({
			amount: joi.number().required(),
			description: joi.string(),
			payerId: joi.string()
		})
	}

}
