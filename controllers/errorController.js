const fs= require('fs')

const sendErrorDev=(err,req,res)=>{
    //API 
    if(req.originalUrl.startsWith('/api')){
        res.status(err.statusCode).json({
            status:err.status,
            error:err,
            message: err.message,
            stack:err.stack,
        });
    }
    //RENDER WEBSITE
    else{
        res.status(err.statusCode).render('error',{
            title: 'Something went wrong!',
            msg:err.message
        });
    }
}

module.exports=(err,req,res,next)=>{ // định nghĩa 4 tham số err,req,res,next thì Express sẽ tự động hiểu là error handling middleware, 3 tham số (err,req,res) là object, err sẽ nhận lỗi thì next(new AppError)
    err.statusCode=err.statusCode || 500;
    err.status=err.status || 'error';

    console.log(err.message);

    if(err.message.includes('tea-room-app.shows index: date_1_content_1 dup key')){
        if(req.body.imageShow != 'undefined'){
            const fileImgShowDel = req.body.imageShow
            fs.unlinkSync(`${__dirname}/../public/img/shows/${fileImgShowDel}`); // xóa file ảnh
        }
    }

    if(err.message.includes('tea-room-app.menus index: name_1 dup key')){
        if(req.body.imageDish != 'undefined'){
            const fileImgMenuDel = req.body.imageDish
            fs.unlinkSync(`${__dirname}/../public/img/menus/${fileImgMenuDel}`); // xóa file ảnh
        }
    }

    sendErrorDev(err,req,res);
}