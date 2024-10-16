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

/**
 * @swagger
 * /api/v1/job:
 *   post:
 *     summary: Create a new job (Admin only)
 *     tags:
 *       - Jobs
 *     description: Allows an admin to create a new job listing.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Software Engineer"
 *                 description: "The title of the job"
 *                 required: true
 *               closingDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-30"
 *                 description: "The closing date for job applications"
 *                 required: true
 *               rating:
 *                 type: string
 *                 example: "4.5"
 *                 description: "The job rating"
 *                 required: true
 *               companyName:
 *                 type: string
 *                 example: "Tech Solutions Ltd."
 *                 description: "Name of the company offering the job"
 *                 required: true
 *               companyType:
 *                 type: string
 *                 example: "Private"
 *                 description: "Type of the company"
 *                 required: true
 *               jobType:
 *                 type: string
 *                 example: "Full-time"
 *                 description: "Type of the job (e.g., Full-time, Part-time)"
 *                 required: true
 *               workMode:
 *                 type: string
 *                 example: "Remote"
 *                 description: "Work mode (e.g., Remote, On-site)"
 *                 required: true
 *               department:
 *                 type: string
 *                 example: "Engineering"
 *                 description: "Department for the job"
 *                 required: true
 *               experience:
 *                 type: string
 *                 example: "3+ years"
 *                 description: "Required experience for the job"
 *                 required: true
 *               description:
 *                 type: string
 *                 example: "Looking for a skilled Software Engineer."
 *                 description: "Detailed description of the job"
 *                 required: true
 *               location:
 *                 type: string
 *                 example: "Silicon Valley"
 *                 description: "Location of the job"
 *                 required: true
 *               postedBy:
 *                 type: string
 *                 example: "admin@example.com"
 *                 description: "Email of the admin posting the job"
 *                 required: true
 *               img:
 *                 type: string
 *                 example: "https://example.com/job-image.png"
 *                 description: "Image URL for the job"
 *                 required: true
*     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f8"
 *                 title:
 *                   type: string
 *                   example: "Software Engineer"
 *                 closingDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-10-30"
 *                 rating:
 *                   type: string
 *                   example: "4.5"
 *                 companyName:
 *                   type: string
 *                   example: "Tech Solutions Ltd."
 *                 companyType:
 *                   type: string
 *                   example: "Private"
 *                 jobType:
 *                   type: string
 *                   example: "Full-time"
 *                 workMode:
 *                   type: string
 *                   example: "Remote"
 *                 department:
 *                   type: string
 *                   example: "Engineering"
 *                 experience:
 *                   type: string
 *                   example: "3+ years"
 *                 description:
 *                   type: string
 *                   example: "Looking for a skilled Software Engineer."
 *                 location:
 *                   type: string
 *                   example: "Silicon Valley"
 *                 postedBy:
 *                   type: string
 *                   example: "admin@example.com"
 *                 img:
 *                   type: string
 *                   example: "https://example.com/job-image.png"
 *                 createdAt:
 *                   type: string
 *                   example: "2024-10-16T12:34:56.789Z"
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * /api/v1/job:
 *   get:
 *     summary: Get all jobs
 *     tags:
 *       - Jobs
 *     description: Retrieve a list of all jobs. Accessible by any authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "64c87b7a3c6b9921505ab6f8"
 *                   title:
 *                     type: string
 *                     example: "Software Engineer"
 *                   closingDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-30"
 *                   rating:
 *                     type: string
 *                     example: "4.5"
 *                   companyName:
 *                     type: string
 *                     example: "Tech Solutions Ltd."
 *                   companyType:
 *                     type: string
 *                     example: "Private"
 *                   jobType:
 *                     type: string
 *                     example: "Full-time"
 *                   workMode:
 *                     type: string
 *                     example: "Remote"
 *                   department:
 *                     type: string
 *                     example: "Engineering"
 *                   experience:
 *                     type: string
 *                     example: "3+ years"
 *                   description:
 *                     type: string
 *                     example: "Looking for a skilled Software Engineer."
 *                   location:
 *                     type: string
 *                     example: "Silicon Valley"
 *                   postedBy:
 *                     type: string
 *                     example: "admin@example.com"
 *                   img:
 *                     type: string
 *                     example: "https://example.com/job-image.png"
 *                   createdAt:
 *                     type: string
 *                     example: "2024-10-16T12:34:56.789Z"
 *                   updatedAt:
 *                     type: string
 *                     example: "2024-10-17T10:12:45.123Z"
 *       401:
 *         description: Unauthorized - User must be authenticated
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/job/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags:
 *       - Jobs
 *     description: Retrieve a specific job by its ID. Accessible by any authenticated user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c87b7a3c6b9921505ab6f8"
 *         description: The unique ID of the job
 *     responses:
 *       200:
 *         description: Job details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f8"
 *                 title:
 *                   type: string
 *                   example: "Software Engineer"
 *                 closingDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-10-30"
 *                 rating:
 *                   type: string
 *                   example: "4.5"
 *                 companyName:
 *                   type: string
 *                   example: "Tech Solutions Ltd."
 *                 companyType:
 *                   type: string
 *                   example: "Private"
 *                 jobType:
 *                   type: string
 *                   example: "Full-time"
 *                 workMode:
 *                   type: string
 *                   example: "Remote"
 *                 department:
 *                   type: string
 *                   example: "Engineering"
 *                 experience:
 *                   type: string
 *                   example: "3+ years"
 *                 description:
 *                   type: string
 *                   example: "Looking for a skilled Software Engineer."
 *                 location:
 *                   type: string
 *                   example: "Silicon Valley"
 *                 postedBy:
 *                   type: string
 *                   example: "admin@example.com"
 *                 img:
 *                   type: string
 *                   example: "https://example.com/job-image.png"
 *                 createdAt:
 *                   type: string
 *                   example: "2024-10-16T12:34:56.789Z"
 *                 updatedAt:
 *                   type: string
 *                   example: "2024-10-17T10:12:45.123Z"
 *       400:
 *         description: Invalid job ID
 *       401:
 *         description: Unauthorized - User must be authenticated
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/job/{id}:
 *   put:
 *     summary: Edit a job by ID (Admin only)
 *     tags:
 *       - Jobs
 *     description: Allows an admin to edit an existing job by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c87b7a3c6b9921505ab6f8"
 *         description: The unique ID of the job
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Software Engineer"
 *               closingDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-30"
 *               rating:
 *                 type: string
 *                 example: "4.5"
 *               companyName:
 *                 type: string
 *                 example: "Tech Solutions Ltd."
 *               companyType:
 *                 type: string
 *                 example: "Private"
 *               jobType:
 *                 type: string
 *                 example: "Full-time"
 *               workMode:
 *                 type: string
 *                 example: "Remote"
 *               department:
 *                 type: string
 *                 example: "Engineering"
 *               experience:
 *                 type: string
 *                 example: "3+ years"
 *               description:
 *                 type: string
 *                 example: "Looking for a skilled Software Engineer."
 *               location:
 *                 type: string
 *                 example: "Silicon Valley"
 *               postedBy:
 *                 type: string
 *                 example: "admin@example.com"
 *               img:
 *                 type: string
 *                 example: "https://example.com/job-image.png"
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f8"
 *                 title:
 *                   type: string
 *                   example: "Software Engineer"
 *                 closingDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-10-30"
 *                 rating:
 *                   type: string
 *                   example: "4.5"
 *                 companyName:
 *                   type: string
 *                   example: "Tech Solutions Ltd."
 *                 companyType:
 *                   type: string
 *                   example: "Private"
 *                 jobType:
 *                   type: string
 *                   example: "Full-time"
 *                 workMode:
 *                   type: string
 *                   example: "Remote"
 *                 department:
 *                   type: string
 *                   example: "Engineering"
 *                 experience:
 *                   type: string
 *                   example: "3+ years"
 *                 description:
 *                   type: string
 *                   example: "Looking for a skilled Software Engineer."
 *                 location:
 *                   type: string
 *                   example: "Silicon Valley"
 *                 postedBy:
 *                   type: string
 *                   example: "admin@example.com"
 *                 img:
 *                   type: string
 *                   example: "https://example.com/job-image.png"
 *                 updatedAt:
 *                   type: string
 *                   example: "2024-10-17T10:12:45.123Z"
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/job/{id}:
 *   delete:
 *     summary: Delete a job by ID (Admin only)
 *     tags:
 *       - Jobs
 *     description: Allows an admin to delete a job by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c87b7a3c6b9921505ab6f8"
 *         description: The unique ID of the job
 *     responses:
 *       204:
 *         description: Job deleted successfully
 *       400:
 *         description: Invalid job ID
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/job/search/{key}:
 *   get:
 *     summary: Search jobs by keyword
 *     tags:
 *       - Jobs
 *     description: Search for jobs by a keyword. Accessible by any authenticated user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *           example: "Engineer"
 *         description: The keyword to search for in job titles or descriptions
 *     responses:
 *       200:
 *         description: A list of jobs matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "64c87b7a3c6b9921505ab6f8"
 *                   title:
 *                     type: string
 *                     example: "Software Engineer"
 *                   closingDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-30"
 *                   rating:
 *                     type: string
 *                     example: "4.5"
 *                   companyName:
 *                     type: string
 *                     example: "Tech Solutions Ltd."
 *                   companyType:
 *                     type: string
 *                     example: "Private"
 *                   jobType:
 *                     type: string
 *                     example: "Full-time"
 *                   workMode:
 *                     type: string
 *                     example: "Remote"
 *                   department:
 *                     type: string
 *                     example: "Engineering"
 *                   experience:
 *                     type: string
 *                     example: "3+ years"
 *                   description:
 *                     type: string
 *                     example: "Looking for a skilled Software Engineer."
 *                   location:
 *                     type: string
 *                     example: "Silicon Valley"
 *                   postedBy:
 *                     type: string
 *                     example: "admin@example.com"
 *                   img:
 *                     type: string
 *                     example: "https://example.com/job-image.png"
 *                   createdAt:
 *                     type: string
 *                     example: "2024-10-16T12:34:56.789Z"
 *                   updatedAt:
 *                     type: string
 *                     example: "2024-10-17T10:12:45.123Z"
 *       400:
 *         description: Invalid search key
 *       401:
 *         description: Unauthorized - User must be authenticated
 *       500:
 *         description: Server error
 */

  
module.exports = jobRouter;