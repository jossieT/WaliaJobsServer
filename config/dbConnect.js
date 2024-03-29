const mongoose = require('mongoose');

const dbConnect = async () =>{
        try{
            mongoose.connect(process.env.MONGO_REMOTE_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Walia db connection successful");
        } catch(error){
            console.log(`Walia db connection error. message: ${error.message}`);
        }
}

module.exports = dbConnect;