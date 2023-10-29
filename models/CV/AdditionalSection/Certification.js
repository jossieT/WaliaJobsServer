const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({

    certificationName: {
        type: String
    },
    issuedBy: {
        type: String
    },
    issuedDate: {
        type: Date
    },
})

const Certification = mongoose.model("Certification", certificationSchema);
module.exports = Certification;