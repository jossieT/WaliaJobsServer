const Admin = require("../models/Users/Admins");
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
    if(verify){
        //find the admin
        const user = await Admin.findById(verify.id);
        //console.log(admin);
        //save the user in to req.obj
        req.userAuth = user;
        next();
    } else{
        const err = new Error("Expired or Invalid token.");
        next(err);
    }
}

module.exports = isLoggedIn;