const router = require('express').Router({ mergeParams: true });;
const Controller = require('../controllers/wallet');
const Validator = require('../utils/validator');

const id = "\\w{24}";

router.route(`/`)
		.get(Controller.getwallet)
		.post(Controller.activateWallet)

router.route('/action')
		.post(Validator(Controller.fundWalletSchema), Controller.fundWallet)
		.put(Validator(Controller.debitSchema), Controller.debitWallet)	

router.get('/log', Controller.userTransactionsLog)

router.post('/savetransaction', Validator(Controller.savetransactionSchema), Controller.savetransaction)


router.get('/transactionslog', Controller.userTransactionLog)

router.post('/transfer', Controller.doTransfer)

router.route(`/fund`)
		.get(Controller.get)
		.post(Validator(Controller.fundWalletSchema), Controller.fundWallet)
		.put(Validator(Controller.debitSchema), Controller.debitWallet)	



module.exports = router;
