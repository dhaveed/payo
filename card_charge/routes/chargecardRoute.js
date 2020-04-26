

const router = require('express').Router();
const Controller = require('../controllers/controller');
const Validator = require('../utils/validator');

const id = "\\w{24}";
router.route('/chargecard').post(Validator(Controller.CardChargeSchema), Controller.CardCharge)


module.exports = router;
