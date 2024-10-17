const express = require("express");
const { uploadImage } = require('../../controllers/uploadController');
const { upload } = require('../../service/uploadService');
const { adminProtect } = require('../../utils/protect');
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
  .post(upload.single('img'),adminProtect, uploadImage, addNewBlog)
  .get(getAllBlogs)

  blogRouter
  .route("/:id")
  .get(getSingleBlog)
  .put(upload.single('img'), adminProtect, uploadImage, updateBlog)
  .delete(adminProtect, deleteBlog);

  blogRouter.get("/search/:key", searchBlog);

  /**
 * @swagger
 * /api/v1/blogs:
 *   post:
 *     summary: Admin creates a new blog post
 *     tags: 
 *       - Blogs
 *     security:
 *       - BearerAuth: []
 *     description: Allows an admin to create a new blog post. Admin must be authenticated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "How to Build Scalable Node.js Applications"
 *                 description: "The title of the blog post"
 *               blogCategory:
 *                 type: string
 *                 example: "Technology"
 *                 description: "Category of the blog post"
 *               author:
 *                 type: string
 *                 example: "John Doe"
 *                 description: "The author of the blog"
 *               description:
 *                 type: string
 *                 example: "This blog explains how to build scalable applications using Node.js and modern tools."
 *                 description: "Content or description of the blog post"
 *               createdBy:
 *                 type: string
 *                 example: "64c87b7a3c6b9921505ab6f7"
 *                 description: "Admin ID who created the blog"
 *               img:
 *                 type: string
 *                 example: "https://example.com/blog-image.jpg"
 *                 description: "URL of the blog image"
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f7"
 *                 title:
 *                   type: string
 *                   example: "How to Build Scalable Node.js Applications"
 *                 blogCategory:
 *                   type: string
 *                   example: "Technology"
 *                 author:
 *                   type: string
 *                   example: "John Doe"
 *                 description:
 *                   type: string
 *                   example: "This blog explains how to build scalable applications using Node.js and modern tools."
 *                 createdBy:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f7"
 *                 img:
 *                   type: string
 *                   example: "https://example.com/blog-image.jpg"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: 
 *       - Blogs
 *     security:
 *       - BearerAuth: []
 *     description: Retrieve a specific blog post by its ID. Accessible by any authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c87b7a3c6b9921505ab6f7"
 *         description: The unique ID of the blog post
 *     responses:
 *       200:
 *         description: Blog post details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f7"
 *                 title:
 *                   type: string
 *                   example: "How to Build Scalable Node.js Applications"
 *                 blogCategory:
 *                   type: string
 *                   example: "Technology"
 *                 author:
 *                   type: string
 *                   example: "John Doe"
 *                 description:
 *                   type: string
 *                   example: "This blog explains how to build scalable applications using Node.js and modern tools."
 *                 createdBy:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f7"
 *                 img:
 *                   type: string
 *                   example: "https://example.com/blog-image.jpg"
 *                 createdAt:
 *                   type: string
 *                   example: "2024-10-16T12:34:56.789Z"
 *                 updatedAt:
 *                   type: string
 *                   example: "2024-10-17T10:12:45.123Z"
 *       400:
 *         description: Invalid blog ID
 *       401:
 *         description: Unauthorized - User must be authenticated
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: 
 *       - Blogs
 *     security:
 *       - BearerAuth: []
 *     description: Retrieve a specific blog post by its ID. Accessible by any authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c87b7a3c6b9921505ab6f7"
 *         description: The unique ID of the blog post
 *     responses:
 *       200:
 *         description: Blog post details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f7"
 *                 title:
 *                   type: string
 *                   example: "How to Build Scalable Node.js Applications"
 *                 blogCategory:
 *                   type: string
 *                   example: "Technology"
 *                 author:
 *                   type: string
 *                   example: "John Doe"
 *                 description:
 *                   type: string
 *                   example: "This blog explains how to build scalable applications using Node.js and modern tools."
 *                 createdBy:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f7"
 *                 img:
 *                   type: string
 *                   example: "https://example.com/blog-image.jpg"
 *                 createdAt:
 *                   type: string
 *                   example: "2024-10-16T12:34:56.789Z"
 *                 updatedAt:
 *                   type: string
 *                   example: "2024-10-17T10:12:45.123Z"
 *       400:
 *         description: Invalid blog ID
 *       401:
 *         description: Unauthorized - User must be authenticated
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   put:
 *     summary: Edit a blog post by ID (Admin only)
 *     tags: 
 *       - Blogs
 *     security:
 *       - BearerAuth: []
 *     description: Allows an admin to edit an existing blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c87b7a3c6b9921505ab6f7"
 *         description: The unique ID of the blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "How to Build Scalable Node.js Applications"
 *                 description: "The title of the blog post"
 *               blogCategory:
 *                 type: string
 *                 example: "Technology"
 *                 description: "Category of the blog post"
 *               author:
 *                 type: string
 *                 example: "John Doe"
 *                 description: "The author of the blog"
 *               description:
 *                 type: string
 *                 example: "Updated blog content explaining how to scale applications using modern tools."
 *                 description: "The updated content of the blog post"
 *               img:
 *                 type: string
 *                 example: "https://example.com/updated-blog-image.jpg"
 *                 description: "URL of the updated blog image"
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f7"
 *                 title:
 *                   type: string
 *                   example: "How to Build Scalable Node.js Applications"
 *                 blogCategory:
 *                   type: string
 *                   example: "Technology"
 *                 author:
 *                   type: string
 *                   example: "John Doe"
 *                 description:
 *                   type: string
 *                   example: "Updated blog content explaining how to scale applications using modern tools."
 *                 img:
 *                   type: string
 *                   example: "https://example.com/updated-blog-image.jpg"
 *                 createdAt:
 *                   type: string
 *                   example: "2024-10-16T12:34:56.789Z"
 *                 updatedAt:
 *                   type: string
 *                   example: "2024-10-17T10:12:45.123Z"
 *       400:
 *         description: Invalid input or blog ID
 *       401:
 *         description: Unauthorized - Admin access required
 *       403:
 *         description: Forbidden - Only admins can edit blogs
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   delete:
 *     summary: Delete a blog post by ID (Admin only)
 *     tags: 
 *       - Blogs
 *     security:
 *       - BearerAuth: []
 *     description: Allows an admin to delete a specific blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c87b7a3c6b9921505ab6f7"
 *         description: The unique ID of the blog post
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog post deleted successfully."
 *       400:
 *         description: Invalid blog ID
 *       401:
 *         description: Unauthorized - Admin access required
 *       403:
 *         description: Forbidden - Only admins can delete blogs
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/blogs/search/{key}:
 *   get:
 *     summary: Search blogs by keyword
 *     tags: 
 *       - Blogs
 *     description: Search for blogs by a keyword. The keyword can match the title, description, or other fields of a blog.
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *           example: "Node.js"
 *         description: The keyword to search for in blog posts (e.g., title, description, etc.)
 *     responses:
 *       200:
 *         description: List of matching blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "64c87b7a3c6b9921505ab6f7"
 *                   title:
 *                     type: string
 *                     example: "How to Build Scalable Node.js Applications"
 *                   blogCategory:
 *                     type: string
 *                     example: "Technology"
 *                   author:
 *                     type: string
 *                     example: "John Doe"
 *                   description:
 *                     type: string
 *                     example: "A detailed guide on building scalable Node.js applications."
 *                   createdBy:
 *                     type: string
 *                     example: "64c87b7a3c6b9921505ab6f7"
 *                   img:
 *                     type: string
 *                     example: "https://example.com/blog-image.jpg"
 *                   createdAt:
 *                     type: string
 *                     example: "2024-10-16T12:34:56.789Z"
 *                   updatedAt:
 *                     type: string
 *                     example: "2024-10-17T10:12:45.123Z"
 *       400:
 *         description: Invalid search keyword
 *       404:
 *         description: No blogs found matching the keyword
 *       500:
 *         description: Server error
 */


module.exports = blogRouter;