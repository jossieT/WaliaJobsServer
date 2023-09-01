const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

      username: {
        type: String,
        required: true,
        unique: true
      },
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
        required: true
      },
      gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
      },
      phoneNumber: {
        type: String
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
        type: Date
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
      }
    },{ timestamps: true });
    
    const User = mongoose.model('User', userSchema);
    
    module.exports = User;