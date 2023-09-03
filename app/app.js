const express = require('express');
const morgan = require('morgan');
const { globalErrHandler, 
        notFoundErr 
      } = require('../middlewares/globalErrHandler');
const jobRouter = require('../routes/content/jobRouter');
const app = express();

//===Middlewares===
app.use(express.json());
//pass incoming json data
app.use(morgan("dev"));

app.use((req, res, next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use("/api/v1/job", jobRouter);



//Not Found Error
app.use(notFoundErr);
//error middleswares
app.use(globalErrHandler);

module.exports = app;