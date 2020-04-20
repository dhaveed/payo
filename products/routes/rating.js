

const router = require('express').Router({mergeParams : true})
const id = "\\w{24}";
const Controller = require('../controllers/rating');
const Validator = require('../utils/validator');


router.route('/')
      .get(Controller.get)
      .post(Validator(Controller.createSchema), Controller.create);

router.route(`/:rating`)
      .delete(Controller.delete)
      .put(Validator(Controller.updateSchema), Controller.update);

module.exports = router;
