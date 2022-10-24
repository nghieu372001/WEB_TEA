const express=require('express');
const authController=require('../controllers/authController'); //import file authController.js từ thư mục controller
const seatController=require('../controllers/seatController'); //import file authController.js từ thư mục controller

const router=express.Router({mergeParams:true});

//get all seat
router.get('/',authController.protect,authController.restrictTo('admin'),seatController.getAllSeat);

//create seat
router.post('/',authController.protect,authController.restrictTo('admin'),seatController.createSeat);



module.exports=router;