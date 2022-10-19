const express=require('express');
const authController=require('../controllers/authController'); //import file authController.js từ thư mục controller
const menuController=require('../controllers/menuController'); //import file authController.js từ thư mục controller

const router=express.Router();

router.post('/',authController.protect,authController.restrictTo('admin'),menuController.uploadMenuImage,menuController.resizeMenuPhoto,menuController.createMenu);
router.patch('/:id',authController.protect,authController.restrictTo('admin'),menuController.uploadMenuImage,menuController.resizeMenuPhoto,menuController.updateMenu);
router.delete('/:id',authController.protect,authController.restrictTo('admin'),menuController.deleteMenu) //authController.restrictTo('admin','lead-guide') // admin, lead-guide mới có quyền xóa tour



module.exports=router;