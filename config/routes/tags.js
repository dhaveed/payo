
const router = require('express').Router();
const Controller = require('../controllers/tags');

router.get('/', Controller.get)

module.exports = router;
