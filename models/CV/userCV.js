const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCvSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  jobPosition: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  fieldOfStudy: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  description: {
    type: String
  }
});

const UserCV = mongoose.model('UserCV', userCvSchema);

module.exports = UserCV;