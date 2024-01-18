const jwt = require('jsonwebtoken');

const generateToken = (res, userId) =>{
   // const userId = userId;
   // const role = user.role;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret', {expiresIn: '5d'});
    console.log('token', token)

    res.cookie('jwt', token, {
        httpOnly: true,
        secure:true ,//process.env.NODE_ENV !== 'development',
        sameSite: 'none',
        maxAge: 5 * 24 * 60 * 60 * 1000
    })
    console.log('cookie created successfully');
    
}

module.exports = generateToken;