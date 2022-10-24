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
router.post('/confirm-order/',authController.protect,authController.restrictTo('admin'),orderController.confirmManymOrder);

//deny order
router.post('/deny-order/:idOrder',authController.protect,authController.restrictTo('admin'),orderController.denyOrder);
router.post('/deny-order/',authController.protect,authController.restrictTo('admin'),orderController.denyManyOrder);

//delete order
router.delete('/:idOrder',authController.protect,authController.restrictTo('admin'),orderController.deleteOrder);
router.delete('/',authController.protect,authController.restrictTo('admin'),orderController.deleteManyOrder);


module.exports=router;