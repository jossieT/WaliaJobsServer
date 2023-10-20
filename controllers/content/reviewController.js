const Review = require("../../models/Contents/Reviews");
const { Company } = require("../../models/Contents/Companies");
const AysncHandler = require("express-async-handler");

//@desc  Post a Review
//@route POST /api/v1/reviews
//@access  Public

exports.addNewReview= AysncHandler(async (req, res) => {
    const {
      companyName, 
      jobTitle,
      iWorkHere,
      reviewLikes,
      reviewDislikes,
      gender,
      workPolicy,
      employmentType,
      department,
      overallRating,
      workLifeBalance,
      salaryAndBenefits,
      promotionAndAppraisal,
      jobSecurity,
      skillDevelopmentANdLearning,
      workSatisfaction,
      companyCulture,
     } = req.body;
 
 
   //create the review
   const reviewCreated = await Review.create({
    companyName, 
    jobTitle,
    iWorkHere,
    reviewLikes,
    reviewDislikes,
    gender,
    workPolicy,
    employmentType,
    department,
    companyRating: {
        overallRating,
        workLifeBalance,
        salaryAndBenefits,
        promotionAndAppraisal,
        jobSecurity,
        skillDevelopmentANdLearning,
        workSatisfaction,
        companyCulture
     }
   });
   
   const company = await Company.findOne({name: reviewCreated.companyName});
    if(company){
     company.userReview.push(reviewCreated._id);
    }
    company.save();

     res.status(201).json({
     status: "success",
     message: "Review added successfully",
     data: reviewCreated
 
   })
 });

//@desc  Get all Reviews
//@route GET /api/v1/reviews
//@access  Public

exports.getAllReviews = AysncHandler(async (req, res) => {
  const reviews = await Review.find();
  if(!reviews){
    throw new Error("No review result found");
  }
  
  res.status(201).json({
    status: "success",
    message: "Reviews fetched successfully",
    data: reviews

  });
});

//@desc  Get single Review
//@route GET /api/v1/reviews/:id
//@access  Private
exports.getSingleReview = AysncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)
    if(!review){
      throw new Error("Review not found!");
    }
    
    res.status(201).json({
      status: "success",
      message: "Review fetched successfully",
      data: review
  
    });
  });

//@desc  Delete Review
//@route DELETE /api/v1/reviews/:id
//@access  Private

exports.deleteReview = AysncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if(!review){
      throw new Error("Review not found found!");
    }
    
    await review.deleteOne();
    res.status(201).json({
      status: "success",
      message: "Review deleted successfully"
    });
  });