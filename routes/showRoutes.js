const express=require('express');
const authController=require('../controllers/authController'); //import file authController.js từ thư mục controller
const showController=require('../controllers/showController'); //import file authController.js từ thư mục controller

const router=express.Router();

router.post('/',authController.protect,authController.restrictTo('admin'),showController.uploadShowImage,showController.resizeShowImage,showController.createShow);
router.patch('/:id',authController.protect,authController.restrictTo('admin'),showController.uploadShowImage,showController.resizeShowImage,showController.updateShow);
router.delete('/:id',authController.protect,authController.restrictTo('admin'),showController.deleteShow) //authController.restrictTo('admin','lead-guide') // admin, lead-guide mới có quyền xóa tour



module.exports=router;