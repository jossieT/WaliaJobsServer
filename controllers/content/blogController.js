const AysncHandler = require("express-async-handler");
const Blogs = require("../../models/Contents/Blogs");
const { response } = require("express");
//const Admin = require("../../model/Staff/Admin");
//const fs = require('fs');
const { uploadImage, imageUrl } = require("../uploadController");
const { deleteImage } = require("../../service/deleteService");

//@desc  Add new Blog
//@route POST /api/v1/blogs
//@acess  Private

exports.addNewBlog= AysncHandler(async (req, res) => {
    const {
      title, 
      blogCategory,
      author,
      description,
      createdBy
     } = req.body;
 
     let uploadedImageUrl;
     if (req.file) {
       uploadedImageUrl = await req.imageData.secure_url;
   }

   //getting the authenticated admin user
   const adminUser = req.admin;

   //checking if the blog exist
   const blogFound = await Blogs.findOne({ title });
   if (blogFound) {
     throw new Error("Blog already exist");
   }
   //create the blog
   const blogCreated = await Blogs.create({
    title, 
    blogCategory,
    author,
    description,
    createdBy: adminUser._id,
    img: uploadedImageUrl
   });
   
     res.status(201).json({
     status: "success",
     message: "New Blog added successfully",
     data: blogCreated
 
   })
 });

//@desc  fetch all Blogs
//@route GET /api/v1/blogs
//@acess  Public

exports.getAllBlogs = AysncHandler(async (req, res) => {
    const blogs = await Blogs.find();
    if(!blogs){
      throw new Error("No Blog result found");
    }
  
    res.status(201).json({
      status: "success",
      message: "All Blogs fetched successfully",
      data: blogs
  
    });
  });

//@desc  fetch single Blog
//@route GET /api/v1/blogs/:id
//@acess  Public

exports.getSingleBlog = AysncHandler(async (req, res) => {
    const blog = await Blogs.findById(req.params.id);
    if(!blog){
      throw new Error("Blog not found!");
    }
  
    res.status(201).json({
      status: "success",
      message: "Blog fetched successfully",
      data: blog
  
    });
  });

//@desc   Update Blog Information
//@route  PUT /api/v1/blogs/:id
//@acess  Private

exports.updateBlog = AysncHandler(async (req, res) => {
    const {
        title, 
        blogCategory,
        author,
        description,
        img
       } = req.body;

       let uploadedImageUrl;
       if (req.file) {
        let blog = await Blogs.findById(req.params.id);
        let oldImageUrl = blog.img;
        if(oldImageUrl){
          deleteImage(img);
        }
        uploadedImageUrl = await req.imageData.secure_url;
       }

  const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id,
    {
        title, 
        blogCategory,
        author,
        description,
        img: uploadedImageUrl
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Blog updated successfully",
    data: updatedBlog

  });
});

//@desc  Delete single Blog
//@route DELETE /api/v1/blogs/:id
//@acess  Private

exports.deleteBlog= AysncHandler(async (req, res) => {
    const blog = await Blogs.findById(req.params.id);
    if(!blog){
      throw new Error("No Blog found!");
    }
    if(blog.img){
      deleteImage(img);
    }
  
    await blog.deleteOne();

    res.status(201).json({
      status: "success",
      message: "Blog deleted successfully"
    });
  });

//@desc  Search Blog by its title
//@route GET /api/v1/blogs/:key
//@acess  Public
exports.searchBlog = AysncHandler(async (req, res) => {
    let filteredBlogs = await Blogs.find({
       "$or":[
          {title: {$regex: req.params.key}}
       ]
    });
    if(filteredBlogs.length == 0){
      throw new Error("no result found");
    }
    res.status(201).json({
      status: "success",
      message: "Blogs search result fetched successfully",
      data: filteredBlogs
    });
  });