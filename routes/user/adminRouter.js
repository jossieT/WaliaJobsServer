const { registerAdmnCtrl, adminLgnCtrl, adminLogout, getAdminProfileCtrl, getAllUsers } = require('../../controllers/user/adminController');
const express = require('express');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');
const { adminProtect } = require('../../utils/protect');


const adminRouter = express.Router();

adminRouter.post('/register', registerAdmnCtrl);

adminRouter.post('/login', adminLgnCtrl);

adminRouter.post('/logout', adminLogout);

adminRouter.get('/profile', adminProtect, getAdminProfileCtrl);

adminRouter.get('/users', adminProtect, getAllUsers);

module.exports = adminRouter;