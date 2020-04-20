const router = require('express').Router({ mergeParams: true });;
const Controller = require('../controllers/wallet');
const Validator = require('../utils/validator');

const id = "\\w{24}";
		
router.get('/', Controller.getAllWallets)	
		
module.exports = router;
