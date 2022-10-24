const mongoose=require('mongoose');

const seatSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter number position'],
    },
    status:{
        type:String,
        emun:['seat','seat sold'], //emun chỉ nhận 1 trong số giá trị trong mảng
        default:'seat'
    },
    description:{
        type:String,
        trim:true,
        emun:['Trống','Bàn Đã Đặt'], 
        default:'Trống'
    },
    show:{
        type: mongoose.Schema.ObjectId,
        ref: 'Show',
        required: [true,'Seat must belong to a show']
    }
})


seatSchema.index({name:1,show:1},{unique:true})


const Seat=mongoose.model('Seat',seatSchema) // //tự động tạo User collection nếu chưa có, 'User' tên không được có chữ s sau cùng
module.exports=Seat