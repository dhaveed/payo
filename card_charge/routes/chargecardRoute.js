

const router = require('express').Router();
const Controller = require('../controllers/controller');
const Validator = require('../utils/validator');

const id = "\\w{24}";
router.route('/chargeCard').post(Validator(Controller.CardChargeSchema), Controller.CardCharge)
router.route('/validateTransaction').post(Validator(Controller.ValidateTransactionSchema), Controller.validateTransaction)


module.exports = router;
