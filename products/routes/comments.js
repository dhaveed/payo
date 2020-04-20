

const router = require('express').Router({mergeParams : true})
const id = "\\w{24}";
const Controller = require('../controllers/comments');
const Validator = require('../utils/validator');


router.route('/')
      .get(Controller.get)
      .post(Validator(Controller.createSchema), Controller.create);

router.route('/allcomment')
		.get(Controller.get)

router.route(`/:productid`)
      .delete(Controller.delete)
      .get(Controller.getOnePComment)
      .put(Validator(Controller.updateSchema), Controller.update);

module.exports = router;
 