

const router = require('express').Router();
const Controller = require('../controllers/controller');
const Validator = require('../utils/validator');

const id = "\\w{24}";
router.route('/chargecard').post(Validator(Controller.createSchema), Controller.CardCharge)


module.exports = router;
