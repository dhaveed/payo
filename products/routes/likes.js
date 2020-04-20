
const router = require('express').Router({mergeParams : true});
const Controller = require('../controllers/likes');
const id = "\\w{24}";

router.route(`/`)
      .get(Controller.likes)

router.route(`/:user`)
      .put(Controller.like)
      .delete(Controller.unlike)

module.exports = router;
