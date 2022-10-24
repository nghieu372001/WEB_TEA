const catchAsync=require('../utils/catchAsync');
const Seat=require('../models/seatModel');

//get all seat
exports.getAllSeat = catchAsync(async (req,res,next) =>{
    const seats = await Seat.find();

    res.status(200).json({
        status:'success',
        result: seats.length,
        data:{
            seats:seats
        }
    });
});



//create seat
exports.createSeat=catchAsync(async(req,res,next)=>{
    const seat=await Seat.create(req.body);
    res.status(200).json({
        status:'success',
        data: {
            seat:seat
        }
    });
});