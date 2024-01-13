const jwt = require('jsonwebtoken');

const generateToken = (res, userId) =>{
   // const userId = userId;
   // const role = user.role;
    const token = jwt.sign({ userId }, "anykey", {expiresIn: "5d"});

    res.cookie('jwt', token, {
        httpOnly: true,
        //signed: true,
        //secure: process.env.NODE_ENV !== 'development',
        sameSite: 'none',

        // sameSite: 'None',
        maxAge: 5 * 24 * 60 * 60 * 1000
    })
}

module.exports = generateToken;