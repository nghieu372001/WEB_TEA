const Order=require('../models/orderModel'); // import model tour từ folder model
const Seat=require('../models/seatModel'); // import model tour từ folder model
const catchAsync=require('../utils/catchAsync');



// kiểm tra phần tử trùng nhau
function array_is_unique( array, size){
    //flag =  1 =>  tồn tại phần tử trùng nhau
    //flag =  0 =>  không tồn tại phần tử trùng nhau
    let flag = 0;
    for (let i = 0; i < size - 1; ++i) {
        for (let j = i + 1; j < size; ++j) {
            if (array[i] == array[j]) {
                /*Tìm thấy 1 phần tử trùng là đủ và dừng vòng lặp*/
                flag = 1;
                break;
            }
        }
    }

    return flag;
}

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
    req.body.user = req.params.userID;
    const order=await Order.create(req.body);
    await Seat.findByIdAndUpdate({_id: req.body.seat},{status:'seat sold',description:'Bàn Đã Đặt'});
    res.status(200).json({
        status:'success',
        data: {
            order:order
        }
    });
});

//confirm order
exports.confirmOrder=catchAsync(async (req,res,next)=>{
    const comfirmOrder =await Order.findOne({_id: req.params.idOrder});
    if(comfirmOrder.seat.status == 'seat sold' && comfirmOrder.status == 'Đã hủy'){
        return next(new Error('Bàn Đã Được Đặt Bởi Người Khác',404));
        
    }
    await Seat.findByIdAndUpdate({_id: comfirmOrder.seat.id},{status:'seat sold',description:'Bàn Đã Đặt'}); // cập nhập lại chỗ ngồi 
    await Order.findByIdAndUpdate(req.params.idOrder, {status:'Đã xác nhận'})
    res.status(204).json({
        status:'success',
        data:null
    })
});


//confirm many order
exports.confirmManymOrder=catchAsync(async (req,res,next)=>{
    const arrOrder = await Order.find({_id: { $in: req.body}});

    console.log(req.body);

    let confirmAgainMany = []
    let isPostionDuplicate = []
    for(let i = 0; i <= arrOrder.length - 1; i++){
        if(arrOrder[i].seat.status == 'seat sold' && arrOrder[i].status == 'Đã hủy'){
            confirmAgainMany.push(arrOrder[i].name)
        }
        if(arrOrder[i].seat.status == 'seat' && arrOrder[i].status == 'Đã hủy'){
            isPostionDuplicate.push(arrOrder[i].seat.name)
        }
    }

    //các bàn này đã được đặt bởi người khác hay chưa
    if(confirmAgainMany.length > 0){
        return next(new Error(`Bàn của ${[...confirmAgainMany]} Đã Được Đặt Bởi Người Khác `,404));  
    }

    //các bàn này có vị trí trùng nhau không
    if(array_is_unique(isPostionDuplicate,isPostionDuplicate.length)){
        return next(new Error(`Đã tồn tại các bàn trùng nhau `,404));  
    }

    for(let i = 0; i <= arrOrder.length - 1;i++){
        await Seat.findByIdAndUpdate({_id: arrOrder[i].seat.id},{status:'seat sold',description:'Bàn Đã Đặt'}); // cập nhập lại chỗ ngồi (many)
    }
    await Order.updateMany({_id: { $in: req.body}},{status:'Đã xác nhận'})
    res.status(204).json({
        status:'success',
        data:null
    })
});

//deny order
exports.denyOrder=catchAsync(async (req,res,next)=>{
    const orderDeny =await Order.findOne({_id: req.params.idOrder});
    await Seat.findByIdAndUpdate({_id: orderDeny.seat.id},{status:'seat',description:'Trống'}); // cập nhập lại chỗ ngồi 
    await Order.findByIdAndUpdate(req.params.idOrder, {status:'Đã hủy'});
    res.status(204).json({
        status:'success',
        data:null
    })
});

//deny many order
exports.denyManyOrder=catchAsync(async (req,res,next)=>{
    const arrOrder = await Order.find({_id: { $in: req.body}});
    for(let i = 0; i <= arrOrder.length - 1;i++){
        if(!(arrOrder[i].status == 'Đã hủy')){
            await Seat.findByIdAndUpdate({_id: arrOrder[i].seat.id},{status:'seat',description:'Trống'}); // cập nhập lại chỗ ngồi (many)
        }
    }
    await Order.updateMany({_id: { $in: req.body}},{status:'Đã hủy'})
    res.status(204).json({
        status:'success',
        data:null
    })
});


//delete order
exports.deleteOrder=catchAsync(async (req,res,next)=>{
    const orderDeny =await Order.findOne({_id: req.params.idOrder});
    await Seat.findByIdAndUpdate({_id: orderDeny.seat.id},{status:'seat',description:'Trống'}); // cập nhập lại chỗ ngồi
    await Order.findByIdAndDelete(req.params.idOrder)
    res.status(204).json({
        status:'success',
        data:null
    })
});

//delete many order
exports.deleteManyOrder=catchAsync(async (req,res,next)=>{
    const arrOrder = await Order.find({_id: { $in: req.body}});
    for(let i = 0; i <= arrOrder.length - 1;i++){
        await Seat.findByIdAndUpdate({_id: arrOrder[i].seat.id},{status:'seat',description:'Trống'}); // cập nhập lại chỗ ngồi (many)
    }
    await Order.deleteMany({_id: { $in: req.body}},{status:'Đã hủy'})
    res.status(204).json({
        status:'success',
        data:null
    })
});

