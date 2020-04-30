

const router = require('express').Router();
const Controller  = require('../controllers/user');
const id = "\\w{24}";
const Validator = require('../utils/validator');
const upload = require('multer')({
  dest : '../../medias',
  fileFilter : require('../utils/imageOnly')
})


router.get('/by/:user', Controller.findUser)

router.get(`/`, Controller.get)
router.get(`/fetch`, Controller.fetch)

// router.get("/searchUser", Controller.searchUser)

// router.get('/countries', Controller.countries);
 
// router.get('/singlecountry/:country', Controller.singlecountry);

router.post(`/:user/update3`, Controller.update3);

router.put('/changepassword', Validator(Controller.changePasswordSchema), Controller.changePassword);

router.get(`/:user`, Controller.myinfo);

router.post(`/:user/followseller`, Validator(Controller.followSchema), Controller.follow);

router.get(`/:user/dashboardinfo`, Controller.userdashboard);
router.post(`/:user/dashboardinfo`, Validator(Controller.createTransactionSchema), Controller.PostTransaction);

router.put(`/:user`, Controller.update)

router.route(`/test/:user`)
      .get(Controller.profile)
      .put(upload.fields([
        {name : 'pictureURL', maxCount : 1},
        {name : 'backgroundPicture', maxCount : 1},
        {name : 'logo', maxCount : 1}
      ]), Controller.update)
      .delete(Controller.delete)
	

module.exports = router;
