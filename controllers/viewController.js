const Menu = require("../models/menuModel");
const Show = require("../models/showModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

//USER
exports.getOverview = async (req,res)=>{
  const menus = await Menu.find();
  const shows = await Show.find();
  const user = res.locals.user;
  if(user){
    let lastName = user.name.split(' ')[user.name.split(' ').length - 1]
    if(lastName.length > 10){
      lastName = lastName.slice(0,7) +'...'
    }
    res.status(200).render('./pages/overview',{
      user:user,
      lastName:lastName,
      menus:menus,
      shows:shows
    })
  }
  else{
    res.status(200).render('./pages/overview',{
      user:false,
      menus:menus,
      shows:shows
    })
  }
};

exports.getLoginForm = (req,res)=>{
    res.status(200).render('./pages/login',{
      title:'Login into your account'
    })
};


exports.getSignupForm = (req,res)=>{
  res.status(200).render('./pages/signup',{
    title:'Sign up your account'
  })
};

exports.getListOrderUser = async (req,res)=>{
  const user = res.locals.user;
  const orderUser = await User.findById(user.id).populate('orders');
  const arrayOrder = orderUser.orders;
  let lastName = user.name.split(' ')[user.name.split(' ').length - 1];
  if(lastName.length > 10){
    lastName = lastName.slice(0,7) +'...'
  }
  res.status(200).render('./pages/list-order-user',{
    user:user,
    arrayOrder:arrayOrder,
    lastName:lastName
  });
};



//ADMIN
exports.getCRUDMenuForm =async (req,res)=>{
    const menus = await Menu.find();
    res.status(200).render('./pages/crud-menu-form',{
      menus:menus,
      //set color side bar admin
      isMenu:true,
      isOrder:false,
      isShow:false
    });
};

exports.getCreateMenuForm =async (req,res)=>{
  res.status(200).render('./pages/create-menu-form',{
      isMenu:true,
      isOrder:false,
      isShow:false
  });
};

exports.getUpdateMenuForm =async (req,res)=>{
    const menu = await Menu.findById(req.params.id);
    res.status(200).render('./pages/update-menu-form',{
      menu:menu,
      //set color side bar admin
      isMenu:true,
      isOrder:false,
      isShow:false
    });
};

exports.getRUDOrderForm =async (req,res)=>{
  let obj = req.query;
  for (const key in obj) {
    if(obj[key]===''){
        delete obj[key]
    }
  }
  for (const key in obj) {
    if(obj[key].includes('\t')){
        obj[key] = obj[key].split('\t')[0]
    }
  }

  if(obj.dateOrder){
    const dateTranfder = obj.dateOrder;
    console.log(dateTranfder)
    obj.dateOrder = new Date(dateTranfder)
  };


  for (const key in obj) {
    if(key != 'dateOrder'){
      obj[key] = { $regex: '.*' + `${obj[key]}` + '.*' }
    }
  }

  const orders = await Order.find(obj).sort({dateOrder:1});
  res.status(200).render('./pages/rud-user-order-form',{
    orders:orders,
    //set color side bar admin
    isMenu:false,
    isOrder:true,
    isShow:false
  });
};

exports.getCRUDShowForm =async (req,res)=>{
  const shows = await Show.find().sort({date:1});
  res.status(200).render('./pages/crud-show-form',{
    shows:shows,
    //set color side bar admin
    isMenu:false,
    isOrder:false,
    isShow:true
  });
};

exports.getCreateShowForm =async (req,res)=>{
  res.status(200).render('./pages/create-show-form',{
    //set color side bar admin
    isMenu:false,
    isOrder:false,
    isShow:true
  });
};

exports.getUpdateShowForm =async (req,res)=>{
  const show = await Show.findById(req.params.id);
  const date = show.date.toLocaleString('zh-HK',{day:'numeric',month: 'numeric',year: 'numeric'});
  const arrayDate = date.split('/');
  if(arrayDate[0] < 10) {arrayDate[0] = `0${arrayDate[0]}`}
  if(arrayDate[1] < 10) {arrayDate[1] = `0${arrayDate[1]}`}
  const dateTranfer = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`;
  console.log(dateTranfer);
  res.status(200).render('./pages/update-show-form',{
    show:show,
    dateTranfer:dateTranfer,
    //set color side bar admin
    isMenu:false,
    isOrder:false,
    isShow:true
  });
};