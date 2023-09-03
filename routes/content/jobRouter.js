const express = require("express");
const {
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob,
    searchJob
} = require("../../controllers/content/jobController");

// const isAdmin = require("../../middlewares/isAdmin");
// const isLoggedin = require("../../middlewares/isLogin");

const jobRouter = express.Router();


jobRouter
  .route("/")
  .post(createJob)
  .get(getAllJobs);

  jobRouter
  .route("/:id")
  .get(getSingleJob)
  .put(updateJob)
  .delete(deleteJob);

  jobRouter.get("/search/:key", searchJob);

module.exports = jobRouter;