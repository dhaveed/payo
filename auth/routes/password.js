

const router = require('express').Router();
const Validator = require('../utils/validator');
const Controller = require('../controllers/password');

router.post(`/token`, Validator(Controller.requestTokenSchema), Controller.requestToken)

router.post(`/reset/:token`, Validator(Controller.resetPasswordSchema), Controller.resetPassword)

router.get(`/token/:id/:token`, Controller.verifyToken)

module.exports = router;
