const mongoose = require('mongoose');
const Achievements = require('./AdditionalSection/Achievement');
const Certification = require('./AdditionalSection/Certification');
const Interest = require('./AdditionalSection/Interest');
const Language = require('./AdditionalSection/Languages');
const Reference = require('./AdditionalSection/Reference');
const Education = require('./Education');
const Experience = require('./Experience');
const Heading = require('./Heading');
const Skills = require('./Skills');
const Summary = require('./Summary');
const Schema = mongoose.Schema;



const userCvSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  achievements: {
    type: Achievements,
    default: {}
  },
  certification: {
    type: Certification,
    default: {}
  },
  interest: {
    type: Interest,
    default: {}
  },
  language: {
    type: Language,
    default: {}
  },
  reference: {
    type: Reference,
    default: {}
  },
  education: {
    type: Education,
    default: {}
  },
  experience: {
    type: Experience,
    default: {}
  },
  heading: {
    type: Heading,
    default: {}
  },
  skills: {
    type: Skills,
    default: {}
  },
  summary: {
    type: Summary,
    default: {}
  },
  
});

const UserCV = mongoose.model('UserCV', userCvSchema);

module.exports = UserCV;