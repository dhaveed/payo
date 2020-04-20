

const router = require('express').Router();
const Controller = require('../controllers/products');
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
router.route('/product/creator/:user').get(Controller.userproduct)
router.route('/dashboard/:user').get(Controller.userdashboard)
router.route('/categories/:id').get(Controller.singleCategories)            
router.route('/icons').get(Controller.icons)
router.route('/icons/:name').get(Controller.singleicon)            
router.route('/hotsellers').get(Controller.hotsellers)
router.route('/search/:string').get(Controller.search)
router.route('/subcategory/:cid').get(Controller.subcategories)
router.route('/similar/:cid/:pid').get(Controller.getSimilar)
router.route(`/:product`)
      .get(Controller.getOne)
      .put(upload.array('photos'), Validator(Controller.updateSchema), Controller.update)
      .delete(Controller.delete)
router.route(`/:product/published`)
      .delete(Controller.unpublish)
      .put(Controller.publish)
router.delete(`/:product/keywords/:keyword`, Controller.removeKeyword);
router.put(`/:product/keywords`, Validator(Controller.addKeywordsSchema), Controller.addKeywords);
router.use(`/comments`, require('./comments'))
router.use(`/:product/ratings`, require('./rating'))
router.use(`/:product/comments`, require('./comments'))


// router.use(`/:product/views`, require('./views'))


module.exports = router;
