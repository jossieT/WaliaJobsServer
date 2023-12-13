const AsyncHandler = require('express-async-handler');
const User = require("../../models/Users/Users");
const generateToken = require('../../utils/tokenGenerator');
const verifyToken = require('../../utils/protect');
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
        return res.status(404).json({
              status: "Bad Request",
              message: 'USer not found with associated email'
          })
      }

      //verify password
      const isMatched = await passwordMatcher(password, user.password);
      if(!isMatched){
          return res.status(401).json({
              status: "Unauthorized",
              message: 'Invalid password'
          })
      } else{
          //save user to req object
          //req.userAuth = user;
          let name = user.fullName;
          const token = generateToken(res, user._id);
          //const verify = verifyToken(token);
          return res.json({ 
              status: "success",
              data: name,
              message: "User logged in successfully"
      });
    }
})

//@desc User Logout
//@route POST /api/v1/user/logout
//@access public

exports.userLogout = AsyncHandler(async (req, res)=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: 'User logged out'
    })
});

//@desc  Get profile
//@route POST /api/v1/user/profile/
//@access private

exports.getUserProfile = AsyncHandler( async (req, res)=>{

    const user = await User.findById(req.user._id);
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

//@desc User Update
//@route POST /api/v1/user/update/:id
//@access private
exports.updateProfile = AsyncHandler( async (req, res)=>{

    const {

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

    let uploadedImageUrl;
       if (req.file) {
        let user = await User.findById(req.params.id);
        let oldImageUrl = user.profilePicture;
        if(oldImageUrl){
          deleteImage(img);
        }
        uploadedImageUrl = await req.imageData.secure_url;
       }

       const userUpdate = await User.findByIdAndUpdate(req.params.id, {
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
       },{
        new: true,
      });

      res.status(201).json({
        status: "success",
        message: "User updated successfully",
        data: userUpdate
      })
})

//@desc delete profile
//@route POST /api/v1/user/delete/:id
//@access private

exports.deleteUser = AsyncHandler (async(req, res)=>{

    const user = await User.findOne(req.params.id);
    if(!user){
        throw new Error("user not found");
    }
    if(user.profilePicture){
        deleteImage(user.profilePicture);
      }
    await user.deleteOne();
    
    res.status(201).json({
        status: "success",
        message: "User deleted successfully",
    })
})
