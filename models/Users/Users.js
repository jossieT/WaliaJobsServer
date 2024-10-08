const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const userSchema = new Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  profilePicture: {
    type: String
  },
  accountStatus: {
    type: String,
    enum: ['Active', 'Deactivated'],
    default: 'Active'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  preferences: {
    language: {
      type: String,
      default: 'English'
    },
    notifications: {
      type: Boolean,
      default: true
    }
  },
  socialMediaProfiles: {
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  role: {
    type: String,
    enum: ['Admin', 'Moderator', 'User'],
    default: 'User'
  },
  resetOtp: {
    type: String,
  },
  otpExpiry: {
    type: Date
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  favouriteJobs: [
    {}
  ]
}, { timestamps: true });

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  console.log(resetToken, this.passwordResetToken);
  return resetToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;