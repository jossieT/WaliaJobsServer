const express = require("express");
const { uploadImage } = require('../../controllers/uploadController');
const { upload } = require('../../service/uploadService');

const {

    addNewBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    searchBlog

} = require("../../controllers/content/blogController");
// const isAdmin = require("../../middlewares/isAdmin");
// const isLoggedin = require("../../middlewares/isLogin");

const blogRouter = express.Router();


blogRouter
  .route("/")
  .post(upload.single('img'), uploadImage, addNewBlog)
  .get(getAllBlogs)

  blogRouter
  .route("/:id")
  .get(getSingleBlog)
  .put(upload.single('img'), uploadImage, updateBlog)
  .delete(deleteBlog);

  blogRouter.get("/search/:key", searchBlog);

module.exports = blogRouter;