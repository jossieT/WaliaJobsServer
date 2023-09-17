const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    reviews: {
        type: String,
    },
    companyType: {
        type: String,
    },
    headOffice: {
        type: String,
    },
    companyLogo: {
        type: String,
        required: true
    },
    employeeNumber: {
        type: String,
        required: true
    },
    mainService: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
},
{ timestamps: true });

const Company = mongoose.model("Company", companySchema);
module.exports = Company;