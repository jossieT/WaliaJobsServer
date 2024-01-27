const express = require("express");
const { uploadImage } = require('../../controllers/uploadController');
const { upload } = require('../../service/uploadService');

const {
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob,
    searchJob,
    deleteAllJobs
} = require("../../controllers/content/jobController");
const imageUpload = require("../../middlewares/imageUpload");
const { adminProtect } = require("../../utils/protect");

// const isAdmin = require("../../middlewares/isAdmin");
// const isLoggedin = require("../../middlewares/isLogin");

const jobRouter = express.Router();


jobRouter
  .route("/")
  .post(upload.single('img'), adminProtect, uploadImage, createJob)
  .get(getAllJobs)
  .delete(adminProtect, deleteAllJobs);

  jobRouter
  .route("/:id")
  .get(getSingleJob)
  .put(upload.single('img'), adminProtect, uploadImage, updateJob)
  .delete(adminProtect, deleteJob);

  jobRouter.get("/search/:key", searchJob);

module.exports = jobRouter;