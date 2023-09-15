const express = require("express");
const { uploadImage } = require('../../controllers/uploadController');
const { upload } = require('../../service/uploadService');

const {
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob,
    deleteImage,
    searchJob,
    deleteAllJobs
} = require("../../controllers/content/jobController");
const imageUpload = require("../../middlewares/imageUpload");

// const isAdmin = require("../../middlewares/isAdmin");
// const isLoggedin = require("../../middlewares/isLogin");

const jobRouter = express.Router();


jobRouter
  .route("/")
  .post(upload.single('img'), uploadImage, createJob)
  .get(getAllJobs)
  .delete(deleteAllJobs);

  jobRouter
  .route("/:id")
  .get(getSingleJob)
  .put(upload.single('img'), uploadImage, updateJob)
  .delete(deleteJob);

  jobRouter.get("/search/:key", searchJob);

module.exports = jobRouter;