const express = require('express');
const morgan = require('morgan');
const { globalErrHandler, 
        notFoundErr 
      } = require('../middlewares/globalErrHandler');
const jobRouter = require('../routes/content/jobRouter');
const imageUpload = require('../middlewares/imageUpload');
const bodyParser = require('body-parser');
const companyRouter = require('../routes/content/companyRouter');
const blogRouter = require('../routes/content/blogRouter');
const reviewRouter = require('../routes/content/reviewRouter');
const cvRouter = require('../routes/cv/userCvRouter');
const adminRouter = require('../routes/user/adminRouter');
const userRouter = require('../routes/user/userRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { swaggerDocs } = require('../swagger');
//const uploadRouter = require('../routes/upload.route');
const app = express();

//===Middlewares===
app.use(cookieParser());

//app.set('trust proxy', 1);
app.use(cors({

  //origin: 'http://localhost:5173',
  origin: 'https://walia-jobs.vercel.app',
  credentials:true
  
}));

app.use((req, res, next) => {
  // Set headers to allow cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', 'https://walia-jobs.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   // Continue to the next middleware
   next();
});

swaggerDocs(app);
app.use(express.json());
//pass incoming json data
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
//app.use('/uploads', express.static('/uploads/images'));
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/companies", companyRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/cv", cvRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
//app.use('/upload', uploadRouter)



//Not Found Error
app.use(notFoundErr);
//error middleswares
app.use(globalErrHandler);

module.exports = app;

