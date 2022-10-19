const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter dish name']
    },
    phone:{
        type:String,
        required:[true,'Please enter your phone'],
        min:[10,'Invalid phone number'],
        max:[11,'Invalid phone number']    
    },
    amount: {
        type:Number,
    },
    dateOrder:{
        type:Date,
        required:[true,'Please enter booking date']
    },
    note:{
        type:String,
        trim:true
    },
    timeOrder:{
        type:String,
        required:[true,'Please enter time']
    },
    user:{
        type: mongoose.Schema.ObjectId, 
        ref: 'User', 
        required: [true,'Review must belong to a user']
    },
    show:{
        type: mongoose.Schema.ObjectId,
        ref: 'Show',
        required: [true,'Review must belong to a show']
    },
    status:{
        type:String,
        enum:['Chờ xác nhận','Đã xác nhận','Đã hủy'],
        default:'Chờ xác nhận'
    }
},{ 
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});


orderSchema.pre(/^find/, function(next){
    this.populate({path:'user',select:'name email'}).populate({path:'show',select:'content'});
    next();
})




const Order=mongoose.model('Order',orderSchema) // //tự động tạo User collection nếu chưa có, 'User' tên không được có chữ s sau cùng
module.exports=Order;