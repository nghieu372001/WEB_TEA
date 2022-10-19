const express=require('express'); // express là function
const morgan=require('morgan');// morgan là một middleware
const path = require('path') // path là thư viện có sẵn của nodejs
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError=require('./utils/appError');
const globalErrorHandle=require('./controllers/errorController'); // //Global Error Handling Middleware


const app=express();

// khai báo đường dẫn của config.env để sử dụng những biến được khai trong đó
dotenv.config({path:'./config.env'});


//TEMPLATE
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views')); // khai báo template nằm ở thư mục nào

//MORGAN
app.use(morgan('dev'));

//COMPRESSION
app.use(compression());

//SET HEADER
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next();
})

//BODY PARSER, reading data from into req.body
app.use(express.json()); //app.use là để sử dụng midleware, express.json() có tác dụng đưa dữ liệu được request(trong phần body của request chứa yêu cầu được client nhập vào ô) từ client vào object request bởi vì express không hỗ trợ điều này
app.use(express.urlencoded({extended:true}));  // midleware xử lý dữ liệu được gửi từ form. khi submit từ  form dữ liệu không thể truy cập bằng req.body nên cần sử dụng cái này
app.use(cookieParser());

//SERVING STATIC FILES
app.use(express.static(`${__dirname}/public`)) // middleware hiển thị img.css, khi là file tĩnh thì nó sẽ trỏ vào thư mục public

//ROUTES
//1. Views
const viewRouter=require('./routes/viewRoutes')
app.use('/',viewRouter)

//2. Users
const userRouter=require('./routes/userRoutes')
app.use('/api/v1/users',userRouter)

//3. Menu
const menuRouter=require('./routes/menuRoutes')
app.use('/api/v1/menus',menuRouter)

//4. Show
const showRouter=require('./routes/showRoutes')
app.use('/api/v1/shows',showRouter)

//5. Order
const orderRouter=require('./routes/orderRoutes')
app.use('/api/v1/orders',orderRouter)

// Xử lý các url chưa được định nghĩa, để ở cuối cùng code
app.all('*',(req,res,next)=>{// thay vì phải viết code xử cho từng phương thức http như get, post, delete thì viết app.all là xử lý cho tất cả các phương thức http, '*' xử lý cho tất cả đường dẫn
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); // khi truyền đối số vào hàm next, dù là gì đi nữa thì Express luôn rằng đó là lỗi, sau đó nó sẽ bỏ qua tất cả các middleware khác trong middleware stack và gửi lỗi mà chúng ta truyền vào tới Global error handling middleware
});


//Global Error Handling Middleware
app.use(globalErrorHandle)


module.exports=app;