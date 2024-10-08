const AsyncHandler = require('express-async-handler');
const User = require("../../models/Users/Users");
const { generateToken, generateAdminToken } = require('../../utils/tokenGenerator.js');
const verifyToken = require('../../utils/protect');
const { passwordHasher, passwordMatcher } = require('../../utils/helpers');
const { uploadImage, imageUrl } = require("../uploadController");
const { deleteImage } = require("../../service/deleteService");
const { sendResetPassworEmail } = require('../../service/emailServices.js');
const crypto = require('crypto');

//@desc register user
//@route POST /api/v1/user/register
//@access public

exports.registerUser = AsyncHandler(async (req, res) => {
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
    if (foundUser) {
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

exports.userLogin = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            status: "Bad Request",
            message: 'USer not found with associated email'
        })
    }

    //verify password
    const isMatched = await passwordMatcher(password, user.password);
    if (!isMatched) {
        return res.status(401).json({
            status: "Unauthorized",
            message: 'Invalid password'
        })
    } else {
        //save user to req object
        //req.userAuth = user;
        let name = user.fullName;
        generateToken(res, user._id);
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

exports.userLogout = AsyncHandler(async (req, res) => {
    res.cookie('usercookie', '', {
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

exports.getUserProfile = AsyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new Error(" User not found");
    } else {
        //console.log(user);
        res.status(200).json({
            status: "Success",
            data: user,
            message: "User profile fetched successfully"
        })
    }
})

//@desc User Update
//@route POST /api/v1/user/update/:id
//@access private
exports.updateProfile = AsyncHandler(async (req, res) => {

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
        let user = await User.findById(req.user._id);
        let oldImageUrl = user.profilePicture;
        if (oldImageUrl) {
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
    }, {
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

exports.deleteUser = AsyncHandler(async (req, res) => {

    const user = await User.findOne(req.user._id);
    if (!user) {
        throw new Error("user not found");
    }
    if (user.profilePicture) {
        deleteImage(user.profilePicture);
    }
    await user.deleteOne();

    res.status(201).json({
        status: "success",
        message: "User deleted successfully",
    })
})

exports.forgotPasswordOTP = AsyncHandler(async (req, res) => {
    const { email } = req.body;

    const otp = crypto.randomInt(100000, 999999);
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min expiry
    await user.save();

    await sendOtpNotification(email, user);

    return res.status(200).json({ message: "OTP sent to your email." });
});

exports.resetPasswordOTP = AsyncHandler(async (req, res) => {
    const { email, otp, newPassword, confirmNewPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Check if OTP is expired
        if (Date.now() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP has expired." });
        }

        // Check if OTP is correct
        if (user.resetOtp !== otp) {
            return res.status(400).json({ message: "Incorrect OTP." });
        }

        // Check if new password and confirm password match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        // Update the user's password and clear the OTP from DB
        user.password = newPassword;
        user.resetOtp = undefined;
        user.otpExpiry = undefined;

        await user.save();
        return res.status(200).json({ message: "Password reset successfully. You can login now." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error resetting password." });
    }
})

exports.forgotPassword = AsyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            status: "Bad Request",
            message: 'USer not found with associated email'
        })
    }

    const resetToken = user.createResetPasswordToken();
    await user.save();


    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/user/reset-password/${resetToken}`
    const message = `We have recieves a password reset request. Please use the below link to reset your password\n\n${resetUrl}\n\nThis reset password link expires in 10 minutes`;

    try {

        await sendResetPassworEmail(user.email, message);
        res.status(200).json({
            message: 'Password reset link is sent to user email.'
        })
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        user.save({ validateBeforeSave: false });
        return res.status(500).json({
            status: "Bad Request",
            message: 'There was an error sending passsword reset email. Please try again later'
        })
    }
});

exports.resetPassword = AsyncHandler(async (req, res) => {

    const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpires: { $gt: Date.now() } });

    if (!user) {
        return res.status(400).json({
            status: "Token Expired",
            message: 'Token is invalid or has expired!'
        })
    }
    //resetting the password
    const hashedPassword = await passwordHasher(req.body.password);
    user.password = hashedPassword;
    user.conformPassword = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.passwordChangedAt = Date.now();

    user.save();

    //Login the user
    generateToken(res, user._id);
    //const verify = verifyToken(token);
    return res.json({
        status: "success",
        message: "Password changed and User logged in successfully"
    });
})

