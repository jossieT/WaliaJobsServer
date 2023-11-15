const jwt = require('jsonwebtoken');

const generateToken = (user) =>{
    const userId = user._id;
    const role = user.role;
    return jwt.sign({ userId, role }, "anykey", {expiresIn: "5d"});
}

module.exports = generateToken;