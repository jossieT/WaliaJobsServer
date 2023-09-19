const AysncHandler = require("express-async-handler");
const Job = require("../../models/Contents/Jobs");
const Company = require("../../models/Contents/Companies");
const { response } = require("express");
//const Admin = require("../../model/Staff/Admin");
//const fs = require('fs');
const { uploadImage, imageUrl } = require("../uploadController");
const { deleteImage } = require("../../service/deleteService");

//@desc  A dd new Company
//@route POST /api/v1/companies
//@acess  Private

exports.addNewCompany= AysncHandler(async (req, res) => {
   const {
     name, 
     rating,
     reviews,
     companyType,
     headOffice,
     companyLogo,
     employeeNumber,
     mainService,
     about,
     postedBy
    } = req.body;

    let uploadedImageUrl;
    if (req.file) {
      uploadedImageUrl = await req.imageData.secure_url;
  }
  //checking if company exist
  const companyFound = await Company.findOne({ name });
  if (companyFound) {
    throw new Error("Company already exist");
  }
  //create the job
  const companyCreated = await Company.create({
    name, 
    rating,
    reviews,
    companyType,
    headOffice,
    companyLogo: uploadedImageUrl,
    employeeNumber,
    mainService,
    about,
    postedBy
  });
  
    res.status(201).json({
    status: "success",
    message: "Company added successfully",
    data: companyCreated

  })
});

//@desc  fetch all Companies
//@route GET /api/v1/companies
//@acess  Public

exports.getAllCompanies = AysncHandler(async (req, res) => {
  const companies = await Company.find();
  if(!companies){
    throw new Error("No company result found");
  }

  res.status(201).json({
    status: "success",
    message: "Companies fetched successfully",
    data: companies

  });
});
 
//@desc  fetch single Company
//@route GET /api/v1/compainies/:id
//@acess  Public

exports.getSingleCompany = AysncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  //.populate("jobs");
  if(!company){
    throw new Error("Company not found!");
  }

  res.status(201).json({
    status: "success",
    message: "Company fetched successfully",
    data: company

  });
});

//@desc   Update Company Details
//@route  PUT /api/v1/companies/:id
//@acess  Private

exports.updateCompany = AysncHandler(async (req, res) => {
    const {
        name, 
        rating,
        reviews,
        companyType,
        headOffice,
        companyLogo,
        employeeNumber,
        mainService,
        about,
        postedBy
       } = req.body;

       let uploadedImageUrl;
       if (req.file) {
        let company = await Company.findById(req.params.id);
        let oldImageUrl = company.companyLogo;
        if(oldImageUrl){
          deleteImage(companyLogo);
        }
        uploadedImageUrl = await req.imageData.secure_url;
       }

  const updatedCompany = await Company.findByIdAndUpdate(req.params.id,
    {
        name, 
        rating,
        reviews,
        companyType,
        headOffice,
        companyLogo: uploadedImageUrl,
        employeeNumber,
        mainService,
        about,
        postedBy
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Company updated successfully",
    data: updatedCompany

  });
});

//@desc  Delete single Company
//@route DELETE /api/v1/companies/:id
//@acess  Private

exports.deleteCompany= AysncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  if(!company){
    throw new Error("No Company found!");
  }
  if(company.companyLogo){
    deleteImage(companyLogo);
  }

  await job.deleteOne();
  res.status(201).json({
    status: "success",
    message: "Company deleted successfully"
  });
});

//@desc  Delete all Companies
//@route DELETE /api/v1/admin/companies/
//@acess  Private

exports.deleteAllCopanies = AysncHandler(async (req, res) => {
  await Company.deleteMany({});
  //await Job.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "All Companies deleted successfully",
  });
});
    
//@desc  Search Company by its name
//@route GET /api/v1/compaines/:key
//@acess  Public
exports.searchCompany = AysncHandler(async (req, res) => {
  let filteredCompanies = await Company.find({
     "$or":[
        {name: {$regex: req.params.key}}
     ]
  });
  if(filteredCompanies.length == 0){
    throw new Error("no result found");
  }
  res.status(201).json({
    status: "success",
    message: "Companies search result fetched successfully",
    data: filteredCompanies
  });
});
