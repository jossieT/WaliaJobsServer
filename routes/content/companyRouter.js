const express = require("express");
const { uploadImage } = require('../../controllers/uploadController');
const { upload } = require('../../service/uploadService');
const { adminProtect } = require("../../utils/protect");

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
  .post(upload.single('companyLogo'), adminProtect, uploadImage, addNewCompany)
  .get(getAllCompanies)

  companyRouter
  .route("/:id")
  .get(getSingleCompany)
  .put(upload.single('companyLogo'), adminProtect, uploadImage, updateCompany)
  .delete(adminProtect, deleteCompany);

  companyRouter.get("/search/:key", searchCompany);

  /**
 * @swagger
 * /api/v1/companies:
 *   post:
 *     summary: Create a new company (Admin only)
 *     tags: 
 *       - Companies
 *     description: Allows an admin to create a new company.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tech Solutions Ltd."
 *                 description: "The name of the company"
 *                 required: true
 *               rating:
 *                 type: string
 *                 example: "4.5"
 *                 description: "The company's rating"
 *                 required: true
 *               headOffice:
 *                 type: string
 *                 example: "1234 Tech Lane, Silicon Valley"
 *                 description: "The company's head office"
 *               employeeNumber:
 *                 type: string
 *                 example: "150"
 *                 description: "Number of employees in the company"
 *                 required: true
 *               mainService:
 *                 type: string
 *                 example: "Software Development"
 *                 description: "Main service provided by the company"
 *                 required: true
 *               about:
 *                 type: string
 *                 example: "A leading tech solutions provider."
 *                 description: "Brief description of the company"
 *                 required: true
 *     responses:
 *       201:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f7"
 *                 name:
 *                   type: string
 *                   example: "Tech Solutions Ltd."
 *                 rating:
 *                   type: string
 *                   example: "4.5"
 *                 headOffice:
 *                   type: string
 *                   example: "1234 Tech Lane, Silicon Valley"
 *                 employeeNumber:
 *                   type: string
 *                   example: "150"
 *                 mainService:
 *                   type: string
 *                   example: "Software Development"
 *                 about:
 *                   type: string
 *                   example: "A leading tech solutions provider."
 *                 createdBy:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f7"
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
 * /api/v1/companies:
 *   get:
 *     summary: Get all companies
 *     tags: 
 *       - Companies
 *     description: Retrieve a list of all companies. Accessible by any authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of companies
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
 *                   name:
 *                     type: string
 *                     example: "Tech Solutions Ltd."
 *                   rating:
 *                     type: string
 *                     example: "4.5"
 *                   headOffice:
 *                     type: string
 *                     example: "1234 Tech Lane, Silicon Valley"
 *                   employeeNumber:
 *                     type: string
 *                     example: "150"
 *                   mainService:
 *                     type: string
 *                     example: "Software Development"
 *                   about:
 *                     type: string
 *                     example: "A leading tech solutions provider."
 *                   createdBy:
 *                     type: string
 *                     example: "64c87b7a3c6b9921505ab6f7"
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
 * /api/v1/companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: 
 *       - Companies
 *     description: Retrieve a specific company by its ID. Accessible by any authenticated user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c87b7a3c6b9921505ab6f7"
 *         description: The unique ID of the company
 *     responses:
 *       200:
 *         description: Company details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f7"
 *                 name:
 *                   type: string
 *                   example: "Tech Solutions Ltd."
 *                 rating:
 *                   type: string
 *                   example: "4.5"
 *                 headOffice:
 *                   type: string
 *                   example: "1234 Tech Lane, Silicon Valley"
 *                 employeeNumber:
 *                   type: string
 *                   example: "150"
 *                 mainService:
 *                   type: string
 *                   example: "Software Development"
 *                 about:
 *                   type: string
 *                   example: "A leading tech solutions provider."
 *                 createdBy:
 *                   type: string
 *                   example: "64c87b7a3c6b9921505ab6f7"
 *                 createdAt:
 *                   type: string
 *                   example: "2024-10-16T12:34:56.789Z"
 *                 updatedAt:
 *                   type: string
 *                   example: "2024-10-17T10:12:45.123Z"
 *       400:
 *         description: Invalid company ID
 *       401:
 *         description: Unauthorized - User must be authenticated
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/companies/{id}:
 *   put:
 *     summary: Edit a company by ID (Admin only)
 *     tags: 
 *       - Companies
 *     description: Allows an admin to edit an existing company by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c87b7a3c6b9921505ab6f7"
 *         description: The unique ID of the company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tech Solutions Ltd."
 *                 description: "The name of the company"
 *                 required: true
 *               rating:
 *                 type: string
 *                 example: "4.5"
 *                 description: "The company's rating"
 *                 required: true
 *               headOffice:
 *                 type: string
 *                 example: "1234 Tech Lane, Silicon Valley"
 *                 description: "The company's head office"
 *               employeeNumber:
 *                 type: string
 *                 example: "150"
 *                 description: "Number of employees in the company"
 *                 required: true
 *               mainService:
 *                 type: string
 *                 example: "Software Development"
 *                 description: "Main service provided by the company"
 *                 required: true
 *               about:
 *                 type: string
 *                 example: "A leading tech solutions provider."
 *                 description: "Brief description of the company"
 *                 required: true
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: Invalid input or company ID
 *       401:
 *         description: Unauthorized - Admin access required
 *       403:
 *         description: Forbidden - Only admins can edit companies
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/companies/{id}:
 *   delete:
 *     summary: Delete a company by ID (Admin only)
 *     tags: 
 *       - Companies
 *     security:
 *       - BearerAuth: []
 *     description: Allows an admin to delete a specific company by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c87b7a3c6b9921505ab6f7"
 *         description: The unique ID of the company
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company deleted successfully."
 *       400:
 *         description: Invalid company ID
 *       401:
 *         description: Unauthorized - Admin access required
 *       403:
 *         description: Forbidden - Only admins can delete companies
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/companies/search/{key}:
 *   get:
 *     summary: Search for companies
 *     tags: 
 *       - Companies
 *     description: Search for companies using a search key. Accessible by any authenticated user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *           example: "Tech"
 *         description: The search key to filter companies by name or other fields.
 *     responses:
 *       200:
 *         description: A list of companies matching the search criteria
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
 *                   name:
 *                     type: string
 *                     example: "Tech Solutions Ltd."
 *                   rating:
 *                     type: string
 *                     example: "4.5"
 *                   headOffice:
 *                     type: string
 *                     example: "1234 Tech Lane, Silicon Valley"
 *                   employeeNumber:
 *                     type: string
 *                     example: "150"
 *                   mainService:
 *                     type: string
 *                     example: "Software Development"
 *                   about:
 *                     type: string
 *                     example: "A leading tech solutions provider."
 *                   createdBy:
 *                     type: string
 *                     example: "64c87b7a3c6b9921505ab6f7"
 *                   createdAt:
 *                     type: string
 *                     example: "2024-10-16T12:34:56.789Z"
 *                   updatedAt:
 *                     type: string
 *                     example: "2024-10-17T10:12:45.123Z"
 *       401:
 *         description: Unauthorized - User must be authenticated
 *       404:
 *         description: No companies found matching the search criteria
 *       500:
 *         description: Server error
 */


module.exports = companyRouter;