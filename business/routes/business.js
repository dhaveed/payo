const router = require('express').Router();
const Controller = require('../controllers/controller');
const Validator = require('../utils/validator');

router.post('/create/:userId', Validator(Controller.BusinessSchema), Controller.createBusiness)

module.exports = router;
