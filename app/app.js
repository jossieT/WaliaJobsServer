const express = require('express');
const morgan = require('morgan');
const { globalErrHandler, 
        notFoundErr 
      } = require('../middlewares/globalErrHandler');
const jobRouter = require('../routes/content/jobRouter');
const imageUpload = require('../middlewares/imageUpload');
const bodyParser = require('body-parser');
//const uploadRouter = require('../routes/upload.route');
const app = express();

//===Middlewares===
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

//app.use('/upload', uploadRouter)



//Not Found Error
app.use(notFoundErr);
//error middleswares
app.use(globalErrHandler);

module.exports = app;


//