const { registerUser, userLogin, getUserProfile, updateProfile, deleteUser } = require('../../controllers/user/userController');
const express = require('express');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const { uploadImage } = require('../../controllers/uploadController');
const { upload } = require('../../service/uploadService');
const userRouter = express.Router();

userRouter.post('/register',upload.single('profilePicture'), uploadImage, registerUser);

userRouter.post('/login', userLogin);

userRouter.get('/profile', isLoggedIn, getUserProfile);

userRouter.put('profile/:id', isLoggedIn, updateProfile);

userRouter.delete('delete/:id', deleteUser);

module.exports = userRouter;