const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyType: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    workMode: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobTags: {
        type: String,
        required: true
    },
    timeLeft: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    applicants: {
        type: String
    },
    postedBy: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
},
{ timestamps: true });

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;