const mongoose = require('mongoose');
const dbConnect = async () =>{

        try{
            mongoose.connect(process.env.MONGO_URL);
            console.log("Db connection successful");
        }
        catch(error){
            console.log(`Db connection error. message: ${error.message}`);
        }
}

module.exports = dbConnect;
