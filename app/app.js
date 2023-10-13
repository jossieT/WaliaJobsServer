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
blogRouter
//const uploadRouter = require('../routes/upload.route');
const app = express();

//===Middlewares===
app.use((req, res, next) => {
  // Set headers to allow cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Continue to the next middleware
  next();
});
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

//app.use('/upload', uploadRouter)



//Not Found Error
app.use(notFoundErr);
//error middleswares
app.use(globalErrHandler);

module.exports = app;

