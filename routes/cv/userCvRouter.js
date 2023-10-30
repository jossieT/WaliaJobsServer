const { addNewCv } = require('../../controllers/CV/userCvController');
const express = require('express');
const cvRouter = express.Router();

cvRouter
.route("/")
.post(addNewCv)

module.exports = cvRouter;