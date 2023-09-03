const Admin = require("../model/Staff/Admin");
//const verifyToken = require("../utils/verifyToken");

const isAdmin = async (req, res, next)=>{
    //find the user
    const userId = req.userAuth._id;
    const user = await Admin.findById(userId);
    //check if the user is an admin
    if(user?.role === "admin"){
        next();
    } else {
        next(new Error('Access Denied! accessed only by admins'));
    } 
    
}

module.exports = isAdmin;