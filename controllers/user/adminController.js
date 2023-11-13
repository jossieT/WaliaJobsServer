const AsyncHandler = require('express-async-handler');
const Admin = require('../../models/Users/Admins');
const generateToken = require('../../utils/tokenGenerator');
const bcrypt = require('bcryptjs');
const verifyToken = require('../../utils/verifyToken');
const { passwordHasher, passwordMatcher } = require('../../utils/helpers');

//@desc register admin
//@route POST /api/v1/admins/register
//@access private

exports.registerAdmnCtrl = AsyncHandler (async (req, res)=>{
    const { userName, fullName, email, password, role } = req.body;
        //cheking if email exists
        const adminFound = await Admin.findOne({ email });
        if(adminFound){
           throw new Error ("Admin exist");
        }
        //hash the password 
        const hashedPassword = await passwordHasher(password);
        //Register admin
        const user = await Admin.create({
            userName,
            fullName,
            email,
            password: hashedPassword,
            role: 'Admin'
        });

        res.status(201).json({
            status: "success",
            data: user,
            message: "Admin Registered successfully"
        })
})

//@desc Login admin
//@route POST /api/v1/admins/login
//@access private

exports.adminLgnCtrl = AsyncHandler (async (req, res)=>{
    
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
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
        const token = generateToken(user._id);
        const verify = verifyToken(token);
        return res.json({ 
            data: verify, token,
            message: "Admin logged in successfully"
    });
    }
})

//@desc get all admins
//@route GET /api/v1/admins/
//@access private

exports.getAllAdmnsCtrl = AsyncHandler (async (req, res)=>{
    const admins = await Admin.find();
    return res.status(201).json({
        status: "success",
        message: "Admins fetched successfully",
        data: admins
    });
    
})

//@desc get single admin
//@route GET /api/v1/admins/:id
//@access private

exports.getAdminProfileCtrl = AsyncHandler (async (req, res)=>{
    //console.log(req.userAuth);
    const admin = await Admin.findById(req.userAuth._id).select("-password -createdAt -updatedAt");
    if(!admin){
        throw new Error(" Admin not found");
    }else{
        res.status(200).json({
            status: "success",
            data: admin,
            message: "admin profile fetched successfully"
        })
    }
});
