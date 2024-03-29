const AysncHandler = require("express-async-handler");
const Job = require("../../models/Contents/Jobs");
const { response } = require("express");
//const Admin = require("../../model/Staff/Admin");
const fs = require('fs');
const { uploadImage, imageUrl } = require("../uploadController");
const { deleteImage } = require("../../service/deleteService");
const { Company } = require("../../models/Contents/Companies");

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
     role,
     education,
     responsiblities,
     requirements,
     preferredSkills,
     closingDate,
     applicationFormLink,
     review,
     salary,
     applicants,
     postedBy
    } = req.body;

  const date = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = date.toLocaleString('en-US', options);
  //checking if job exists

  const jobFound = await Job.findOne({ title });
  if (jobFound) {
    throw new Error("Job  already exists");
  }
  let imageUrl;
  const imgCompany = await Company.findOne({name: companyName});
    console.log(imgCompany);
    if(imgCompany){
     imageUrl = imgCompany.companyLogo;
    }else{
      if (req.file) {
        imageUrl = await req.imageData.secure_url;
    }
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
     role,
     education,
     responsiblities,
     requirements,
     preferredSkills,
     closingDate,
     applicationFormLink,
     review,
     salary,
     applicants,
     postedBy,
     jobPostDate: formattedDate,
     img: imageUrl

  });
    //find company using company name and assign object Id of this job
    const company = await Company.findOne({name: jobCreated.companyName});
    console.log(company);
    if(company){
     company.jobs.push(jobCreated._id);
    await  company.save();
    }else {
      console.log('Company not found');
    }
    

    res.status(201).json({
    status: "success",
    message: "Job created successfully",
    data: jobCreated
  })
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
  if(!job){
    throw new Error("Job not found!");
  }
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
        postedBy
       } = req.body;

       let uploadedImageUrl;
       if (req.file) {
        let job = await Job.findById(req.params.id);
        let oldImageUrl = job.img;
        if(oldImageUrl){
          deleteImage(job.img);
        }
        uploadedImageUrl = await req.imageData.secure_url;
       }

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
        img: uploadedImageUrl
    },
    {
      new: true,
    }
  );
  console.log(updatedJob);
  res.status(201).json({
    status: "success",
    message: "Job updated successfully",
    data: updatedJob
  });
});

//@desc  Delete single Job
//@route DELETE /api/v1/Jobs/:id
//@acess  Private

exports.deleteJob = AysncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if(!job){
    throw new Error("No Job found!");
  }
  if(job.img){
    deleteImage(job.img);
  }
  await job.deleteOne();
  //await Job.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Job deleted successfully",
  });
});

//@desc  Delete all Jobs
//@route DELETE /api/v1/Jobs/
//@acess  Private

exports.deleteAllJobs = AysncHandler(async (req, res) => {
  await Job.deleteMany({});
  //await Job.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "All Jobs deleted successfully",
  });
});
    
//@desc  Search Job
//@route GET /api/v1/Jobs/:key
//@acess  Public
exports.searchJob = AysncHandler(async (req, res) => {
  let key = req.params.key;
  let filteredJobs = await Job.find({
     "$or":[
        {title: {$regex: new RegExp(key, 'i')}}
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
