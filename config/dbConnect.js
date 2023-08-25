const mongoose = require('mongoose');
const dbConnect = async () =>{

        try{
            mongoose.connect(process.env.MONGO_URL);
            console.log("Walia db connection successful");
        }
        catch(error){
            console.log(`Walia Wdb connection error. message: ${error.message}`);
        }
}

module.exports = dbConnect;
