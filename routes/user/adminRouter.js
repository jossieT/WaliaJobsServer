const { registerAdmnCtrl, adminLgnCtrl, getAdminProfileCtrl, getAllUsers } = require('../../controllers/user/adminController');
const express = require('express');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');
const adminRouter = express.Router();

adminRouter.post('/register', registerAdmnCtrl);

adminRouter.post('/login', adminLgnCtrl);

adminRouter.get('/profile', isLoggedIn, isAdmin, getAdminProfileCtrl);

adminRouter.get('/users', isLoggedIn, isAdmin, getAllUsers);

module.exports = adminRouter;