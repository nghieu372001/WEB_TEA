const express=require('express');
const userController=require('../controllers/userController') // import hàm từ thư mục controller/userController
const authController=require('../controllers/authController'); //import file authController.js từ thư mục controller
const showRoutes=require('./orderRoutes');

const router=express.Router();


router.post('/signup',authController.signup) // chức năng sign up --> method: POST
router.post('/login',authController.login) // chức năng đăng nhập, gửi các thông tin đăng nhập --> method: POST
router.get('/logout',authController.logout) // chức năng log out



router.get('/',userController.getAllUser) 
router.get('/:id',userController.getUser)
router.use('/:userID/orders',showRoutes) 



module.exports=router;