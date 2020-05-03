

const router = require('express').Router();
const Controller = require('../controllers/controller');
const Validator = require('../utils/validator');

const id = "\\w{24}";
// id -> regex to make get params collect exactly 24 int eg /:user({id})
router.route('/ussd').post(Validator(Controller.ussdChargeSchema), Controller.UssdCharge)


module.exports = router;
