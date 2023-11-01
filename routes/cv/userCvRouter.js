const { addNewCv, getAllUserCv } = require('../../controllers/CV/userCvController');
const express = require('express');
const cvRouter = express.Router();

cvRouter
.route("/")
.post(addNewCv)
.get(getAllUserCv)

module.exports = cvRouter;