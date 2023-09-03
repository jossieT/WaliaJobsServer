const AysncHandler = require("express-async-handler");
const Job = require("../../models/Contents/Jobs");
//const Admin = require("../../model/Staff/Admin");

//@desc  Create Job
//@route POST /api/v1/Jobs
//@acess  Private

exports.createJob = AysncHandler(async (req, res) => {
  const {
     title, 
     rating,
     companyName,
     companyType,
     jobType,
     workMode,
     department,
     experience,
     description,
     location,
     jobTags,
     timeLeft,
     review,
     salary,
     applicants,
     postedBy,
     img
    } = req.body;
  //checking if job exists
  const jobFound = await Job.findOne({ title });
  if (jobFound) {
    throw new Error("Job  already exists");
  }
  //create the job
  const jobCreated = await Job.create({
     title, 
     rating,
     companyName,
     companyType,
     jobType,
     workMode,
     department,
     experience,
     description,
     location,
     jobTags,
     timeLeft,
     review,
     salary,
     applicants,
     postedBy,
     img
  });

  res.status(201).json({
    status: "success",
    message: "Job created successfully",
    data: jobCreated
  });
});

//@desc  fetch all Jobs
//@route GET /api/v1/Jobs
//@acess  Private

exports.getAllJobs = AysncHandler(async (req, res) => {
  const allJobs = await Job.find();
  res.status(201).json({
    status: "success",
    message: "Jobs fetched successfully",
    data: allJobs
  });
});

//@desc  fetch single Job
//@route GET /api/v1/Jobs/:id
//@acess  Private
exports.getSingleJob = AysncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Job fetched successfully",
    data: job
  });
});

//@desc   Update Job
//@route  PUT /api/v1/Jobs/:id
//@acess  Private

exports.updateJob = AysncHandler(async (req, res) => {
    const {
        title, 
        rating,
        companyName,
        companyType,
        jobType,
        workMode,
        department,
        experience,
        description,
        location,
        jobTags,
        timeLeft,
        review,
        salary,
        applicants,
        postedBy,
        img
       } = req.body;
  //check name exists
//   const JobFound = await ClassLevel.findOne({ name });
//   if (JobFound) {
//     throw new Error("Job already exists");
//   }
  const updatedJob = await Job.findByIdAndUpdate(req.params.id,
    {
        title, 
        rating,
        companyName,
        companyType,
        jobType,
        workMode,
        department,
        experience,
        description,
        location,
        jobTags,
        timeLeft,
        review,
        salary,
        applicants,
        postedBy,
        img
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Job updated successfully",
    data: updatedJob
  });
});

//@desc  Delete Job
//@route DELETE /api/v1/Jobs/:id
//@acess  Private
exports.deleteJob = AysncHandler(async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Job deleted successfully",
  });
});

//@desc  Search Job
//@route GET /api/v1/Jobs/:key
//@acess  Public
exports.searchJob = AysncHandler(async (req, res) => {
  let filteredJobs = await Job.find({
     "$or":[
        {title: {$regex: req.params.key}}
     ]
  });
  if(filteredJobs.length == 0){
    throw new Error("no result found");
  }
  res.status(201).json({
    status: "success",
    message: "Job search result fetched successfully",
    data: filteredJobs
  });
});