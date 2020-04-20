const router = require('express').Router();
const Controller = require('../controllers/verification');
const Validator = require('../utils/validator');
const id = "^[0-9]+$";

router.post(`/`, Validator(Controller.refreshCodeSchema), Controller.refreshCode)

router.get(`/:user/:token/:from`, Controller.verify)

module.exports = router;
