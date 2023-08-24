const express = require('express');
const morgan = require('morgan');
const { globalErrHandler, 
        notFoundErr 
      } = require('../middlewares/globalErrHandler');
const app = express();