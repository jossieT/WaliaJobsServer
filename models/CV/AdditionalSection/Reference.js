const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({

    fullName: {
        type: String
    },
    jobTitle: {
        type: String
    },
    companyName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
})

const Reference = mongoose.model("Reference", referenceSchema);
module.exports = Reference;