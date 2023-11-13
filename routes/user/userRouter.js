const AsyncHandler = require('express-async-handler');
const User = require("../../models/Users/Users");
const generateToken = require('../../utils/tokenGenerator');
const verifyToken = require('../../utils/verifyToken');
const { passwordHasher, passwordMatcher } = require('../../utils/helpers');
const { uploadImage, imageUrl } = require("../uploadController");
const { deleteImage } = require("../../service/deleteService");
//@desc register user
//@route POST /api/v1/user/register
//@access public

exports.registerUserCtrl = AsyncHandler (async (req, res)=>{
    const {
        email,
        password,
        fullName,
        dateOfBirth,
        gender,
        phoneNumber,
        address,
        profilePicture,
        accountStatus,
        registrationDate,
        lastLogin,
        language,
        notification,
        facebook,
        twitter,
        instagram,
    } = req.body;
    
    const foundUser = User.find({ email });
    if(foundUser){
        throw new Error("User exist with provided email")
    }

    //checking if image is requested
    let uploadedImageUrl;
     if (req.file) {
       uploadedImageUrl = await req.imageData.secure_url;
   }
    //hash the password 
    const hashedPassword = await passwordHasher(password);
    // Register user
    const user = await User.create({
        email,
        password,
        fullName,
        dateOfBirth,
        gender,
        phoneNumber,
        address,
        profilePicture: uploadedImageUrl,
        accountStatus,
        registrationDate,
        lastLogin,
        language,
        notification,
        facebook,
        twitter,
        instagram,
    })
})