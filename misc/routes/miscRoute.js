

const router = require('express').Router();
const Controller = require('../controllers/controller');
const Validator = require('../utils/validator');

const id = "\\w{24}";
// id -> regex to make get params collect exactly 24 int eg /:user({id})

router.route('/exchangeRates').get(Controller.exchangeRate)
router.route('/listbank').get(Controller.listbank)
router.route('/getfee').get(Validator(Controller.getFeeSchema), Controller.getFee)
module.exports = router;
