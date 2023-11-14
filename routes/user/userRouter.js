const { registerUser, userLogin, getUserProfile } = require('../../controllers/user/userController');
const express = require('express');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const { uploadImage } = require('../../controllers/uploadController');
const { upload } = require('../../service/uploadService');
const userRouter = express.Router();

userRouter.post('/register',upload.single('profilePicture'), uploadImage, registerUser);

userRouter.post('/login', userLogin);

userRouter.get('/profile', isLoggedIn, getUserProfile);

module.exports = userRouter;