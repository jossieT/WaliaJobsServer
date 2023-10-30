const mongoose = require('mongoose');

const headingSchema = new mongoose.Schema({

    headerFirstName: {
        type: String
    },
    headerLastName: {
        type: String
    },
    HeaderPosition: {
        type: String
    },
    HeaderCity: {
        type: String
    },
    headerRegion: {
        type: String
    },
    headerPhone: {
        type: String
    },
    headerEmail: {
        type: String
    },
    profilePic: {
        type: String
    }
})

const Heading = mongoose.model("Heading", headingSchema);
module.exports = { Heading, headingSchema };