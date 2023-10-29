const mongoose = require('mongoose');

const headingSchema = new mongoose.Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    position: {
        type: String
    },
    city: {
        type: String
    },
    region: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    profilePic: {
        type: String
    }
})

const Heading = mongoose.model("Heading", headingSchema);
module.exports = Heading;