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

exports.registerUser = AsyncHandler (async (req, res)=>{
    const {
        email,
        password,
        fullName,
        dateOfBirth,
        gender,
        phoneNumber,
        address,
        language,
        facebook,
        twitter,
        instagram,
    } = req.body;
    
    const foundUser = await User.findOne({ email });
    if(foundUser){
        throw new Error("User exist with provided email");
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
        password: hashedPassword,
        fullName,
        dateOfBirth,
        gender,
        phoneNumber,
        address,
        profilePicture: uploadedImageUrl,
        language,
        socialMediaProfiles: {
            facebook,
            twitter,
            instagram
        }  
    })
    res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: user
    })
});

//@desc User Login
//@route POST /api/v1/user/register
//@access public

exports.userLogin = AsyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user){
        return res.json({
              message: ' Invalid user credencials or user not found'
          })
      }

      //verify password
      const isMatched = await passwordMatcher(password, user.password);
      if(!isMatched){
          return res.json({
              message: 'Invalid user credencials'
          })
      } else{
          //save user to req object
          //req.userAuth = user;
          const token = generateToken(user);
          const verify = verifyToken(token);
          return res.json({ 
              data: verify, token,
              message: "User logged in successfully"
      });
    }
})

exports.getUserProfile = AsyncHandler( async (req, res)=>{

    const user = await User.findById(req.userAuth._id).select("-password -createdAt -updatedAt");
    if(!user){
        throw new Error(" User not found");
    }else{
        res.status(200).json({
            status: "success",
            data: user,
            message: "User profile fetched successfully"
        })
    }
})

exports.updateProfile = AsyncHandler( async (req, res)=>{

})
