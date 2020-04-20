
const router = require('express').Router();

router.use('/countries', require('./countries'));
router.use('/subscription', require('./subscription'));
router.use('/tags', require('./tags'));

module.exports = router;
