const { registerAdmnCtrl, adminLgnCtrl } = require('../../controllers/user/adminController');
const express = require('express');
const adminRouter = express.Router();

adminRouter
.route("/")
.post(registerAdmnCtrl)
.post(adminLgnCtrl)

module.exports = adminRouter;