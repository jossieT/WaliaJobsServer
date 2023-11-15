const Admin = require("../models/Users/Admins");
const User = require("../models/Users/Users");
const verifyToken = require("../utils/verifyToken");
//const verifyToken = require("../utils/verifyToken");

const isLoggedIn = async (req, res, next)=>{
    //get the token from header
    const headerObj = req.headers;
    //const token = await headerObj.authorization.split(" ")[1];
    const token = headerObj && headerObj.authorization && headerObj.authorization.split(" ")[1];
    console.log(token);
    //verify token
    const verify = await verifyToken(token);
    //console.log(verify);
    let user;
    if(verify){
        //find the user
        console.log(verify);
        if(verify.role === "User"){
            user = await User.findById(verify.userId);
        }else if (verify.role === "Admin"){
            user = await Admin.findById(verify.userId);
        }
        //save the user in to req.obj
        req.userAuth = user;
        next();
    } else{
        const err = new Error("Expired or Invalid token.");
        next(err);
    }
}

module.exports = isLoggedIn;