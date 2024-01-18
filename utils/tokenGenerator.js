const jwt = require('jsonwebtoken');

const generateToken = (res, userId) =>{
   // const userId = userId;
   // const role = user.role;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret', {expiresIn: '5d'});
    console.log('token', token)

    res.cookie('_ga_QPPSENWWKM', token, {
        httpOnly: true,
        secure: true ,//process.env.NODE_ENV !== 'development',
        sameSite: 'None',
        maxAge: 5 * 24 * 60 * 60 * 1000
    })
     res.send('Cookie set with SameSite=None');
    
}

module.exports = generateToken;