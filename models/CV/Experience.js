const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({

    expJobTitle: {
        type: String
    },
    employer: {
        type: String
    },
    expCity: {
        type: String,
    },
    exStartDate: {
        type: Date
    },
    expEndDate: {
        type: Date
    },
    currentlyWorkHere: {
        type: Boolean,
        default: false
    }
})

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = { Experience, experienceSchema };