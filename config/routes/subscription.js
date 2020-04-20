
const router = require('express').Router();
const Controller = require('../controllers/subscription');

router.get('/classes', Controller.classes);
router.get('/erp', Controller.erp);
router.get('/market', Controller.market);


module.exports = router
