
const router = require('express').Router({mergeParams : true})
const Controller = require('../controllers/countries');

router.get('/', Controller.get);


module.exports = router;
