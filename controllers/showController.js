const Show=require('../models/showModel'); // import model tour từ folder model
const AppError=require('../utils/appError');
const catchAsync=require('../utils/catchAsync');
const multer =  require('multer'); // thư viện upload ảnh
const sharp =  require('sharp'); // thư viện resize và lưu ảnh
const fs= require('fs');



//filter body
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

//BEGIN upload file img menu
const multerStorage = multer.memoryStorage();
const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }
    else{
        cb(new AppError('Not an image! Please upload only image.',400),false)
    }
};

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
});

exports.uploadShowImage = upload.single('imageShow'); 

//RESIZE IMAGE USER
exports.resizeShowImage = catchAsync(async (req,res,next) =>{
    // Nếu không có file ảnh thì đi đến middleware tiếp theo
    if(!req.file) return next()

    req.file.filename = `show-${req.user.id}-admin-${Date.now()}.jpeg` // đặt lại tên cho ảnh

    await sharp(req.file.buffer).resize(220,280).toFormat('jpeg').jpeg({quanlity:90}).toFile(`public/img/shows/${req.file.filename}`); 
    //sharp(req.file.buffer).resize(500,500)... return ra promise
    next(); // gọi đến midleware tiếp theo
});

//create show
exports.createShow=catchAsync(async(req,res,next)=>{
    req.body.imageShow = req.file.filename;
    const show=await Show.create(req.body);
    res.status(200).json({
        status:'success',
        data: {
            show:show
        }
    });
});

//update show
exports.updateShow=catchAsync(async (req,res,next)=>{ //hàm async return promise
    const filterBody = filterObj(req.body, 'day','date','content','singer'); //filterBody = { name: 'Sophie Louise Hart 1' }
    console.log(filterBody)
    if(req.file){
        filterBody.imageShow = req.file.filename //filterBody.photo vì upload.single('photo')
    };


    const show=await Show.findByIdAndUpdate(req.params.id,filterBody,{new:true,runValidators:true});
    if(!show){ // nếu không tồn tại ID hợp lệ trong database thì sẽ tạo ra lỗi
        return next(new AppError('No menu found with that ID',404)); // return để thoát ra
    }

    res.status(200).json({
        status:'success',
        data:{
            show:show
        }
    });
});

//delete show
exports.deleteShow=catchAsync(async (req,res,next)=>{ //hàm async return promise
    const show = await Show.findByIdAndDelete(req.params.id); //delere ko trả ra dữ liệu nên ko lưu vào biến

    if(!show){ // nếu không tồn tại ID hợp lệ trong database thì sẽ tạo ra lỗi
        return next(new AppError('No show found with that ID',404)); // return để thoát ra
    }

    const fileImgShowDel = show.imageShow
    fs.unlinkSync(`${__dirname}/../public/img/shows/${fileImgShowDel}`); // xóa file ảnh

    res.status(204).json({
        status:'success',
        data:null
    });
});