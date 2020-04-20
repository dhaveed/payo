

const router = require('express').Router();
const Controller = require('../controllers/base');
const Validator = require('../utils/validator');
const AdminController = require('../controllers/admin');

//router.post('/adminlogin', Validator(AdminController.loginSchema), AdminController.login)

//router.post('/adminsignup', Validator(AdminController.signupSchema), AdminController.signup)

router.post('/coordinates', Validator(Controller.coordinateSchema), Controller.storeCoordinates)

router.post('/login', Validator(Controller.loginSchema), Controller.login)

router.post('/logout', Validator(Controller.logoutSchema), Controller.logoutAcc)

router.post('/signup', Validator(Controller.signupSchema), Controller.signup)


router.get('/getuser/:id', Controller.getuser);

router.get('/referal/:referer', Controller.getreferee);

router.get('/fetchuser/:username', Controller.fetchuser);

router.get('/myownposts/:user', Controller.myposts);

router.get('/info/:user', Controller.myinfo);

router.get('/updateEmail', Controller.updateEmail)

module.exports = router;
