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
        type: [String],
        default: ["programming", "excel", "troubleshoot"]
    },
    role: {
        type: String
    },
    education: {
        type: [String]
    },
    responsiblities: {
        type: [String],
        default: []
    },
    requirements: {
        type: [String],
        default: []
    },
    preferredSkills: {
        type: [String],
        default: []
    },
    jobPostDate: {
        type: Date,
        default: Date.now
    },
    closingDate: {
        type: String,
        required: true
    },
    applicationFormLink: {
        type: String
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Companies"
    },
},
{ timestamps: true });

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;