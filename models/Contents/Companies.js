const mongoose = require('mongoose');
const jobs = require('./Jobs');
const Schema = mongoose.Schema;

const benefitsSchema = new Schema({
    InternationalRelocation: {
      type: Boolean,
      default: false
    },
    FreeTransport: {
      type: Boolean,
      default: false
    },
    ChildCare: {
      type: Boolean,
      default: false
    },
    Gymnasium: {
      type: Boolean,
      default: false
    },
    Cafeteria: {
      type: Boolean,
      default: false
    },
    WorkFromHome: {
      type: Boolean,
      default: false
    },
    FreeFood: {
      type: Boolean,
      default: false
    },
    TeamOutings: {
      type: Boolean,
      default: false
    },
    EducationAssistance: {
      type: Boolean,
      default: false
    },
    SoftSkillTraining: {
      type: Boolean,
      default: false
    },
    HealthInsurance: {
      type: Boolean,
      default: false
    },
    JobTraining: {
      type: Boolean,
      default: false
    }
  });

  
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
        type: String
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
    benefits: {        
        type: benefitsSchema,
        default: {}
    },
    jobs: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: jobs
        }
    ]
},
{ timestamps: true });

const Benefits = mongoose.model("Benefits", benefitsSchema);
const Company = mongoose.model("Company", companySchema);
module.exports = { Company, Benefits };