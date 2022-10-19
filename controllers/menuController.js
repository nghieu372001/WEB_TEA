const Menu=require('../models/menuModel'); // import model tour từ folder model
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

exports.uploadMenuImage = upload.single('imageDish'); 

//RESIZE IMAGE USER
exports.resizeMenuPhoto = catchAsync(async (req,res,next) =>{
    // Nếu không có file ảnh thì đi đến middleware tiếp theo
    if(!req.file) return next()

    req.file.filename = `menu-${req.file.originalname}-${Date.now()}.jpeg` //khai báo req.file.filname để exports.updateMe có thể dùng được req.file.filename

    await sharp(req.file.buffer).resize(270,170).toFormat('jpeg').jpeg({quanlity:90}).toFile(`public/img/menus/${req.file.filename}`); // chỉnh lại ảnh có kích thước 500x500 và có định dạng jpeg, jpeg({quanlity:90}) chất lượng hình ảnh: 90%
    //sharp(req.file.buffer).resize(500,500)... return ra promise
    next(); // gọi đến midleware tiếp theo
});



//create menu
exports.createMenu=catchAsync(async(req,res,next)=>{ // hàm catchAsync return ra hàm vô danh sau đó gán vào createTour, khi tạo mới tour thì hàm vô danh đó sẽ được gọi, cần tham số next để gọi đến global error handling middleware
    //create menu có upload ảnh
    req.body.imageDish = req.file.filename; // thêm ảnh vào req.body
    const menu=await Menu.create(req.body);

    res.status(200).json({
        status:'success',
        data: {
            menu:menu
        }
    });
});



//update menu
exports.updateMenu=catchAsync(async (req,res,next)=>{ //hàm async return promise
    const filterBody = filterObj(req.body, 'name','price','description'); //filterBody = { name: 'Sophie Louise Hart 1' }
    if(req.file){
        filterBody.imageDish = req.file.filename //nếu có file ảnh thì thêm imageDish vào object filterBody
    };


    const menu=await Menu.findByIdAndUpdate(req.params.id,filterBody,{new:true,runValidators:true});
    if(!menu){ // nếu không tồn tại ID hợp lệ trong database thì sẽ tạo ra lỗi
        return next(new AppError('No menu found with that ID',404)); // return để thoát ra
    }

    res.status(200).json({
        status:'success',
        data:{
            menu:menu
        }
    });
});


exports.deleteMenu=catchAsync(async (req,res,next)=>{ //hàm async return promise
    const menu = await Menu.findByIdAndDelete(req.params.id); //delere ko trả ra dữ liệu nên ko lưu vào biến

    if(!menu){ // nếu không tồn tại ID hợp lệ trong database thì sẽ tạo ra lỗi
        return next(new AppError('No menu found with that ID',404)); // return để thoát ra
    }

    //Xóa ảnh Menu
    const fileImgMenuDel = menu.imageDish
    fs.unlinkSync(`${__dirname}/../public/img/menus/${fileImgMenuDel}`); // xóa file ảnh

    res.status(204).json({
        status:'success',
        data:null
    });
});