const catchAsync=require('../utils/catchAsync');
const User=require('../models/userModel');


exports.getAllUser = catchAsync(async (req,res,next) =>{
    const users = await User.find();

    res.status(200).json({
        status:'success',
        result: users.length,
        data:{
            users:users
        }
    });
});


exports.getUser = catchAsync(async (req,res,next) =>{
    const user = await User.findById(req.params.id).populate('orders');
    res.status(200).json({
        status:'success',
        data:{
            user:user
        }
    });
});