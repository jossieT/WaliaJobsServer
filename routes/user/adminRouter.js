const { registerAdmnCtrl, adminLgnCtrl } = require('../../controllers/user/adminController');
const express = require('express');
const adminRouter = express.Router();

adminRouter.post('/register', registerAdmnCtrl);

adminRouter.post('/login', adminLgnCtrl);

module.exports = adminRouter;