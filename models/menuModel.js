const mongoose=require('mongoose');

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter dish name'],
        unique:true
    },
    price:{
        type:Number,
        required:[true,'Please enter the price of the dish']
    },
    description:{
        type:String,
        trim:true
    },
    imageDish:{
        type:String,
        required:[true,'Please choose a image of the dish']
    },
})


const Menu=mongoose.model('Menu',menuSchema) // //tự động tạo User collection nếu chưa có, 'User' tên không được có chữ s sau cùng
module.exports=Menu