const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({

    languageName: {
        type: String
    },
    proficiencyLevel: {
        type: String,
        enum: ["Native", "Fluent", "Advanced", "Intermediate", "Low"]
    }
})

const Language = mongoose.model("Certification", languageSchema);
module.exports = Language;