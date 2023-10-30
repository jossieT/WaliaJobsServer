const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({

    institution: {
        type: String
    },
    eduCity: {
        type: String
    },
    qualification: {
        type: String,
        enum: ["Diploma", "Bachelor's Degree", "Master's Degree", "Doctoral degree"]
    },
    fieldOfStudy: {
        type: String
    },
    yearOfGraduation: {
        type: Date
    }
})

const Education = mongoose.model("Education", educationSchema);
module.exports = { Education, educationSchema };