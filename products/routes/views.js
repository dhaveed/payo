
const router = require('express').Router({mergeParams: true});
const Controller = require('../controllers/view');

router.route('/')
	  .post(Controller.View)

module.exports  = router;
