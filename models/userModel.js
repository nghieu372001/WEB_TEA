const mongoose=require('mongoose');
const validator=require('validator');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please tell us your name!']
    },
    email:{
        type:String,
        required:[true,'Please provide your email!'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide a valid email'] //validator.isEmail: kiểm tra có phải là email không, nếu không thì log chuỗi 'Please provide a valid email'
    },
    role:{
        type:String,
        emun:['user','admin'], //emun chỉ nhận 1 trong số giá trị trong mảng
        default:'user'
    },
    password:{
        type:String,
        required:[true,'Provide a password'],
        minlength:8,
        select:false // không hiển thị khi lấy,đọc dữ liệu từ database, nghĩa là khi truy vấn (find,findBy,...) sẽ trả ra dữ liệu không bao gồm trường password mặc dù vẫn có trong database
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            //This only works on CREATE and SAVE!!!
            validator:function(el){ // hàm sẽ được gọi khi documnent đã được tạo, hàm validator sẽ return ra true hoặc false, el là giá trị của passwordConfirm được nhập vào
                return el === this.password //this trỏ về dữ liệu đang được thêm mới, return ra false khi el không bằng password và chạy xuông message
            },
            message:'Password are not the same!' //nếu passwordConfirm != password thì log ra message
        }
    },
    active:{
        type:Boolean,
        default:true,
        select:false // không hiển thị khi lấy,đọc dữ liệu từ database
    }
},{ 
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

userSchema.virtual('orders',{ //orders: tên field ảo được tạo 
    ref:'Order', 
    foreignField: 'user',
    localField:'_id' 
});

//muốn dùng field ảo ở trên phải có populate vào field ảo 
// userSchema.pre(/^find/, function(next){
//     this.populate('orders'); // orders là tên field ảo được tạo ra ở trên
//     next();
// })

userSchema.pre('save',async function(next){// pre: chạy trước các sự kiện(hooks), sẽ lọt vào function middleware trước khi dữ liệu được lưu, next trong trường hợp gọi thêm 1 middleware nữa    
    this.passwordConfirm=undefined;  // khi mã hóa xong thì không cần passwordConfirm nữa, chỉ cần lúc tạo mới, xóa trường passwordConfirm khi lưu dữ liệu  
    next();
});








const User=mongoose.model('User',userSchema) // //tự động tạo User collection nếu chưa có, 'User' tên không được có chữ s sau cùng
module.exports=User