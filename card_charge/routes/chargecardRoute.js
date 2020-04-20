

const router = require('express').Router();
const Controller = require('../controllers/controller');
const Validator = require('../utils/validator');
let maxSize = 1000000 * 1000;
var multer = require('multer');
var upload = multer({dest:'uploads/'});
const id = "\\w{24}";
router.route('/product')
      .get(Controller.get)
      .post(Validator(Controller.createSchema), Controller.create)
router.route('/reportproduct').post(Validator(Controller.reportSchema), Controller.report)
router.route('/wishlist/:id?').post(Validator(Controller.wishlistchema), Controller.wishlist).get(Controller.getwishlist)
router.route('/categories').get(Controller.categories)
router.route('/compare').post(Controller.comparition)


module.exports = router;
