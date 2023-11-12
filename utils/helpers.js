const bcrypt = require('bcryptjs');
//hashing password function
const passwordHasher = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

//comparing password function
const passwordMatcher = async function(enteredPass, userPass){
    const isMatched = await bcrypt.compare(enteredPass, userPass);
    return isMatched;
}

module.exports = { passwordHasher, passwordMatcher };