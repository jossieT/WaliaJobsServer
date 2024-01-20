const { registerAdmnCtrl, adminLgnCtrl, adminLogout, getAdminProfileCtrl, getAllUsers } = require('../../controllers/user/adminController');
const express = require('express');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');
const { protect } = require('../../utils/protect');
const adminRouter = express.Router();

adminRouter.post('/register', registerAdmnCtrl);

adminRouter.post('/login', adminLgnCtrl);

adminRouter.post('/logout', adminLogout);

adminRouter.get('/profile', protect, getAdminProfileCtrl);

adminRouter.get('/users', isLoggedIn, isAdmin, getAllUsers);

module.exports = adminRouter;