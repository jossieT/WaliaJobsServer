const AsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/Users/Users');
const Admin = require('../models/Users/Admins');

const protect = AsyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    console.log(token);
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
  
        // Check token expiration
        if (decoded.exp < Date.now() / 1000) {
          return res.status(401).json({ error: 'Token has expired' });
        }
       
        const authUser = await User.findById(decoded.userId);
        const authAdmin = await Admin.findById(decoded.userId);
        if(authUser){
          req.user = await User.findById(decoded.userId).select('-password');
        }else if(authAdmin){
          req.admin = await Admin.findById(decoded.userId).select('-password');
        }
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Not authorized, invalid token' });
      }
    } else {
      res.status(401).json({ error: 'Not authorized, no token' });
    }
  });
  
  module.exports = { protect };
  