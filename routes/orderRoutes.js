const express=require('express');
const authController=require('../controllers/authController'); //import file authController.js từ thư mục controller
const orderController=require('../controllers/orderController'); //import file authController.js từ thư mục controller

const router=express.Router({mergeParams:true});

//get all order
router.get('/',authController.protect,authController.restrictTo('admin'),orderController.getAllOrder);

//create order
router.post('/',authController.protect,authController.restrictTo('user'),orderController.createOrder);

//confirm order
router.post('/confirm-order/:idOrder',authController.protect,authController.restrictTo('admin'),orderController.confirmOrder);

//deny order
router.post('/deny-order/:idOrder',authController.protect,authController.restrictTo('admin'),orderController.denyOrder);

//delete order
router.delete('/:idOrder',authController.protect,authController.restrictTo('admin'),orderController.deleteOrder);


module.exports=router;