const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the rating
const companyRatingSchema = new Schema({
  overallRating: {
    type: Number,
    min: 1,
    max: 5
  },
  workLifeBalance: {
    type: Number,
    min: 1,
    max: 5
  },
  salaryAndBenefits: {
    type: Number,
    min: 1,
    max: 5
  },
  promotionAndAppraisal: {
    type: Number,
    min: 1,
    max: 5
  },
  jobSecurity: {
    type: Number,
    min: 1,
    max: 5
  },
  skillDevelopmentANdLearning: {
    type: Number,
    min: 1,
    max: 5
  },
  workSatisfaction: {
    type: Number,
    min: 1,
    max: 5
  },
  companyCulture: {
    type: Number,
    min: 1,
    max: 5
  },
});

// Schema for the review
const reviewSchema = new Schema({
  
  companyName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  iWorkHere: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  reviewLikes: {
    type: String,
    required: true
  },
  reviewDislikes: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  workPolicy: {
    type: String,
    enum: ['workFromHome', 'workFromOffice', 'hybrid', 'unclear'],
    required: true
  },
  employmentType: {
    type: String,
    enum: ['fullTime', 'partTime', 'contractual', 'inter', 'freelancer'],
    required: true
  },
  department: {
    type: String,
    enum: ['computer science', 'management', 'accounting', 'software development', 'banking operation'],
    required: true
  },
  companyRating: {
    type: companyRatingSchema,
    required: true
  }
},{ timestamps: true });

// Create the model for the review
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;