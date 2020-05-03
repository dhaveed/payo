

const router = require('express').Router();
const Controller = require('../controllers/controller');
const Validator = require('../utils/validator');

const id = "\\w{24}";
// id -> regex to make get params collect exactly 24 int eg /:user({id})
router.route('/chargeCard').post(Validator(Controller.CardChargeSchema), Controller.CardCharge)
router.route('/validateTransaction').post(Validator(Controller.ValidateTransactionSchema), Controller.validateTransaction)
router.route('/vefifyTransaction').post(Validator(Controller.VerifyTransactionSchema), Controller.verifyTransaction)
router.route('/tokenizedCharge').post(Validator(Controller.tokenizedSchema), Controller.tokenizedCharge)


module.exports = router;
