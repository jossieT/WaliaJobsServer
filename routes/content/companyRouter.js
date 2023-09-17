const express = require("express");
const { uploadImage } = require('../../controllers/uploadController');
const { upload } = require('../../service/uploadService');

const {

    addNewCompany,
    getAllCompanies,
    getSingleCompany,
    updateCompany,
    deleteCompany,
    searchCompany

} = require("../../controllers/content/companyController");
// const isAdmin = require("../../middlewares/isAdmin");
// const isLoggedin = require("../../middlewares/isLogin");

const companyRouter = express.Router();


companyRouter
  .route("/")
  .post(upload.single('companyLogo'), uploadImage, addNewCompany)
  .get(getAllCompanies)

  companyRouter
  .route("/:id")
  .get(getSingleCompany)
  .put(upload.single('companyLogo'), uploadImage, updateCompany)
  .delete(deleteCompany);

  companyRouter.get("/search/:key", searchCompany);

module.exports = companyRouter;