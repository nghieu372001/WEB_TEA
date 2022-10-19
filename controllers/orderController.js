const Order=require('../models/orderModel'); // import model tour từ folder model
const catchAsync=require('../utils/catchAsync');

//get all order
exports.getAllOrder=catchAsync(async(req,res,next)=>{ // hàm catchAsync return ra hàm vô danh sau đó gán vào createTour, khi tạo mới tour thì hàm vô danh đó sẽ được gọi, cần tham số next để gọi đến global error handling middleware
    const orders=await Order.find();
    res.status(200).json({
        status:'success',
        data: {
            orders:orders
        }
    });
});

//create order
exports.createOrder=catchAsync(async(req,res,next)=>{ 
    req.body.user = req.params.userID
    const order=await Order.create(req.body);
    res.status(200).json({
        status:'success',
        data: {
            order:order
        }
    });
});

//confirm order
exports.confirmOrder=catchAsync(async (req,res,next)=>{
    await Order.findByIdAndUpdate(req.params.idOrder, {status:'Đã xác nhận'})
    res.status(204).json({
        status:'success',
        data:null
    })
});

//deny order
exports.denyOrder=catchAsync(async (req,res,next)=>{
    await Order.findByIdAndUpdate(req.params.idOrder, {status:'Đã hủy'})
    res.status(204).json({
        status:'success',
        data:null
    })
});

//delete order
exports.deleteOrder=catchAsync(async (req,res,next)=>{
    await Order.findByIdAndDelete(req.params.idOrder)
    res.status(204).json({
        status:'success',
        data:null
    })
});
