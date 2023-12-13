const AsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/Users/Users');


const protect = AsyncHandler(async(req, res, next) =>{
    let token;

    token = req.cookies.jwt;
    if(token){
        try {
            const decoded = jwt.verify(token, "anykey");
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, Invalid token");
        }
    } else{
            res.status(401);
            throw new Error("Not authorized, no token");
    }
})

module.exports = { protect };