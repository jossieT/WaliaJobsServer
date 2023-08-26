const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the benefits

const BenefitsSchema = new mongoose.Schema({
  "International Relocation": {
    type: Boolean,
    default: false
  },
  "Free Transport": {
    type: Boolean,
    default: false
  },
  "Child Care": {
    type: Boolean,
    default: false
  },
  "Gymnasium": {
    type: Boolean,
    default: false
  },
  "Cafeteria": {
    type: Boolean,
    default: false
  },
  "Work From Home": {
    type: Boolean,
    default: false
  },
  "Free Food": {
    type: Boolean,
    default: false
  },
  "Team Outings": {
    type: Boolean,
    default: false
  },
  "Education Assistance": {
    type: Boolean,
    default: false
  },
  "Soft Skill Training": {
    type: Boolean,
    default: false
  },
  "Health Insurance": {
    type: Boolean,
    default: false
  },
  "Job Training": {
    type: Boolean,
    default: false
  }
});

// Schema for the review
const ReviewSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  companyId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  reviewLike: {
    type: String,
    required: true
  },
  reviewDislike: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  benefits: {
    type: BenefitsSchema,
    required: true
  }
});

// Create the model for the review
const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;