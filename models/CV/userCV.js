const mongoose = require('mongoose');
const { Achievements, achievementsSchema} = require('./AdditionalSection/Achievement');
const { Certification, certificationSchema} = require('./AdditionalSection/Certification');
const { Interest, interestSchema } = require('./AdditionalSection/Interest');
const { Language, languageSchema} = require('./AdditionalSection/Languages');
const { Reference, referenceSchema } = require('./AdditionalSection/Reference');
const { Education,educationSchema } = require('./Education');
const { Experience, experienceSchema } = require('./Experience');
const { Heading, headingSchema } = require('./Heading');
const { Skills, skillSchema } = require('./Skills');
const { Summary, summarySchema } = require('./Summary');
const Schema = mongoose.Schema;



const userCvSchema = new Schema({
  user: {
    type: String,
    default: "user"
  },
  achievements: {
    type: achievementsSchema,
    default: {}
  },
  certification: [{
    type: certificationSchema,
    default: {}
  }],
  interest: {
    type: interestSchema,
    default: {}
  },
  language: [{
    type: languageSchema,
    default: {}
  }],
  reference: [{
    type: referenceSchema,
    default: {}
  }],
  education: [{
    type: educationSchema,
    default: {}
  }],
  experience: [{
    type: experienceSchema,
    default: {}
  }],
  heading: {
    type: headingSchema,
    default: {}
  },
  skills: {
    type: skillSchema,
    default: {}
  },
  summary: {
    type: summarySchema,
    default: {}
  },
  
});

const UserCV = mongoose.model('UserCV', userCvSchema);

module.exports = UserCV;