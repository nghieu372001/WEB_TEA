const express=require('express');
const viewsController = require('../controllers/viewController');
const authController=require('../controllers/authController'); //import file authController.js từ thư mục controller



const router=express.Router();

//user
router.get('/',authController.isLoggedIn,viewsController.getOverview);
router.get('/list-order-user',authController.isLoggedIn,viewsController.getListOrderUser);
router.get('/login',viewsController.getLoginForm);
router.get('/signup',viewsController.getSignupForm);

//admin
router.get('/crud-menu-form',authController.protect,authController.restrictTo('admin'),viewsController.getCRUDMenuForm);
router.get('/create-menu-form',authController.protect,authController.restrictTo('admin'),viewsController.getCreateMenuForm);
router.get('/update-menu-form/:id',authController.protect,authController.restrictTo('admin'),viewsController.getUpdateMenuForm);

router.get('/rud-user-order-form',authController.protect,authController.restrictTo('admin'),viewsController.getRUDOrderForm);

router.get('/crud-show-form',authController.protect,authController.restrictTo('admin'),viewsController.getCRUDShowForm);
router.get('/create-show-form',authController.protect,authController.restrictTo('admin'),viewsController.getCreateShowForm);
router.get('/update-show-form/:id',authController.protect,authController.restrictTo('admin'),viewsController.getUpdateShowForm);




 
module.exports=router;