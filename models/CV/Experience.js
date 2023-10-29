const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({

    jobTitle: {
        type: String
    },
    employer: {
        type: String
    },
    city: {
        type: String,
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    currentlyWorkHere: {
        type: Boolean,
        default: false
    }
})

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;