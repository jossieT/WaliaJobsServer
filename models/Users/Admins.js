const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
        type: String,
        required: true
      },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Moderator', 'User'],
        default: 'Amdin'
      },
  },
  {
    timestamps: true,
  }
);
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
