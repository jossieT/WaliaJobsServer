const express = require('express');

const {
    addNewReview,
    getAllReviews,
    getSingleReview,
    deleteReview
} = require('../../controllers/content/reviewController');
const { userProtect } = require('../../utils/protect');
const reviewRouter = express.Router();

reviewRouter.route("/")
.post(userProtect ,addNewReview)
.get(getAllReviews);

reviewRouter.route("/:id")
.get(getSingleReview)
.delete(userProtect, deleteReview);

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     summary: Post a new review
 *     tags:
 *       - Reviews
 *     description: Allows any authenticated user to post a new review.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: "Tech Solutions Ltd."
 *               jobTitle:
 *                 type: string
 *                 example: "Software Engineer"
 *               iWorkHere:
 *                 type: string
 *                 enum: ['Yes', 'No']
 *                 example: "Yes"
 *               reviewLikes:
 *                 type: string
 *                 example: "10"
 *               reviewDislikes:
 *                 type: string
 *                 example: "2"
 *               gender:
 *                 type: string
 *                 enum: ['Male', 'Female']
 *                 example: "Female"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-16"
 *               workPolicy:
 *                 type: string
 *                 enum: ['workFromHome', 'workFromOffice', 'hybrid', 'unclear']
 *                 example: "hybrid"
 *               employmentType:
 *                 type: string
 *                 enum: ['fullTime', 'partTime', 'contractual', 'inter', 'freelancer']
 *                 example: "fullTime"
 *               department:
 *                 type: string
 *                 enum: ['computer science', 'management', 'accounting', 'software development', 'banking operation']
 *                 example: "software development"
 *               companyRating:
 *                 type: number
 *                 format: float
 *                 example: 4.5
 *     responses:
 *       201:
 *         description: Review posted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review created successfully."
 *                 review:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64c87b7a3c6b9921505ab6f8"
 *                     companyName:
 *                       type: string
 *                       example: "Tech Solutions Ltd."
 *                     jobTitle:
 *                       type: string
 *                       example: "Software Engineer"
 *                     # Include other fields here as needed
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - User must be authenticated
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags:
 *       - Reviews
 *     description: Retrieve a list of all reviews.
 *     responses:
 *       200:
 *         description: A list of reviews
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
 *                   companyName:
 *                     type: string
 *                     example: "Tech Solutions Ltd."
 *                   jobTitle:
 *                     type: string
 *                     example: "Software Engineer"
 *                   iWorkHere:
 *                     type: string
 *                     enum: ['Yes', 'No']
 *                     example: "Yes"
 *                   reviewLikes:
 *                     type: string
 *                     example: "10"
 *                   reviewDislikes:
 *                     type: string
 *                     example: "2"
 *                   gender:
 *                     type: string
 *                     enum: ['Male', 'Female']
 *                     example: "Female"
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-16"
 *                   workPolicy:
 *                     type: string
 *                     enum: ['workFromHome', 'workFromOffice', 'hybrid', 'unclear']
 *                     example: "hybrid"
 *                   employmentType:
 *                     type: string
 *                     enum: ['fullTime', 'partTime', 'contractual', 'inter', 'freelancer']
 *                     example: "fullTime"
 *                   department:
 *                     type: string
 *                     enum: ['computer science', 'management', 'accounting', 'software development', 'banking operation']
 *                     example: "software development"
 *                   companyRating:
 *                     type: number
 *                     format: float
 *                     example: 4.5
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   get:
 *     summary: Get a single review by ID
 *     tags:
 *       - Reviews
 *     description: Retrieve a single review by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c87b7a3c6b9921505ab6f8"
 *         description: The unique ID of the review
 *     responses:
 *       200:
 *         description: Review details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f8"
 *                 companyName:
 *                   type: string
 *                   example: "Tech Solutions Ltd."
 *                 jobTitle:
 *                   type: string
 *                   example: "Software Engineer"
 *                 iWorkHere:
 *                   type: string
 *                   enum: ['Yes', 'No']
 *                   example: "Yes"
 *                 reviewLikes:
 *                   type: string
 *                   example: "10"
 *                 reviewDislikes:
 *                   type: string
 *                   example: "2"
 *                 gender:
 *                   type: string
 *                   enum: ['Male', 'Female']
 *                   example: "Female"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2024-10-16"
 *                 workPolicy:
 *                   type: string
 *                   enum: ['workFromHome', 'workFromOffice', 'hybrid', 'unclear']
 *                   example: "hybrid"
 *                 employmentType:
 *                   type: string
 *                   enum: ['fullTime', 'partTime', 'contractual', 'inter', 'freelancer']
 *                   example: "fullTime"
 *                 department:
 *                   type: string
 *                   enum: ['computer science', 'management', 'accounting', 'software development', 'banking operation']
 *                   example: "software development"
 *                 companyRating:
 *                   type: number
 *                   format: float
 *                   example: 4.5
 *       400:
 *         description: Invalid review ID
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID (Admin only)
 *     tags:
 *       - Reviews
 *     description: Allows an admin to delete a review by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c87b7a3c6b9921505ab6f8"
 *         description: The unique ID of the review
 *     responses:
 *       204:
 *         description: Review deleted successfully
 *       400:
 *         description: Invalid review ID
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */


module.exports = reviewRouter;
