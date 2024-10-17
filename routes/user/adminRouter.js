const { registerAdmnCtrl, adminLgnCtrl, adminLogout, getAdminProfileCtrl, getAllUsers } = require('../../controllers/user/adminController');
const express = require('express');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');
const { adminProtect } = require('../../utils/protect');


const adminRouter = express.Router();

adminRouter.post('/register', registerAdmnCtrl);

adminRouter.post('/login', adminLgnCtrl);

adminRouter.post('/logout', adminLogout);

adminRouter.get('/profile', adminProtect, getAdminProfileCtrl);

adminRouter.get('/users', adminProtect, getAllUsers);

/** POST Methods */
    /**
     * @openapi
     * '/api/v1/admin/register':
     *  post:
     *     tags:
     *     - Admin
     *     summary: Register admin
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *              - password
     *              - fullName
     *              - phoneNumber
     *            properties: 
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *              fullName:
     *                type: string
     *                default: John Doe
     *              phoneNumber:
     *                type: string
     *                default: 123456789
     *            example:
     *              email: johndoe@mail.com
     *              password: johnDoe20!@
     *              fullName: John Doe
     *              phoneNumber: 123456789
     *     responses:
     *      201:
     *        description: Created
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                id:
     *                  type: string
     *                  example: "60c72b2f5b4c5c001f8e4e99"
     *                email:
     *                  type: string
     *                  example: johndoe@mail.com
     *                fullName:
     *                  type: string
     *                  example: John Doe
     *      409:
     *        description: Conflict - User already exists
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                error:
     *                  type: string
     *                  example: "User already exists"
     *      404:
     *        description: Not Found
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                error:
     *                  type: string
     *                  example: "Resource not found"
     *      500:
     *        description: Server Error
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                error:
     *                  type: string
     *                  example: "Internal server error"
     */

/** POST Methods */
    /**
     * @openapi
     * '/api/v1/admin/login':
     *  post:
     *     tags:
     *     - Admin
     *     summary: Admin login with email and password
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *              - password
     *            properties: 
     *              email:
     *                type: string
     *                example: johndoe@mail.com
     *              password:
     *                type: string
     *                example: JohnDoe20!@
     *     responses:
     *      200:
     *        description: Successful login
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                token:
     *                  type: string
     *                  description: JWT authentication token
     *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     *                message:
     *                  type: string
     *                  example: "Login successful"
     *      400:
     *        description: Bad Request - Invalid input
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                error:
     *                  type: string
     *                  example: "Invalid email or password"
     *      401:
     *        description: Unauthorized - Invalid credentials
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                error:
     *                  type: string
     *                  example: "Incorrect email or password"
     *      500:
     *        description: Server Error
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                error:
     *                  type: string
     *                  example: "Internal server error"
     */

/** POST Methods */
    /**
     * @openapi
     * '/api/v1/admin/logout':
     *  post:
     *     tags:
     *     - Admin
     *     summary: Log out the current Admin
     *     security:
     *       - bearerAuth: []
     *     description: Logs the user out by invalidating the access token (JWT) and refresh token.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - refreshToken
     *             properties:
     *               refreshToken:
     *                 type: string
     *                 description: The refresh token to invalidate
     *                 example: "d1f2d9f5-7a12-4d7d-8454-57c6d77465e2"
     *     responses:
     *      200:
     *        description: Logout successful
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                message:
     *                  type: string
     *                  example: "Logout successful, tokens invalidated"
     *      400:
     *        description: Bad Request - Missing or invalid refresh token
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                error:
     *                  type: string
     *                  example: "Invalid or missing refresh token"
     *      401:
     *        description: Unauthorized - No valid access token (JWT) provided
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                error:
     *                  type: string
     *                  example: "Invalid or missing access token"
     *      500:
     *        description: Server error
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                error:
     *                  type: string
     *                  example: "Internal server error"
     */

/**
 * @openapi
 * '/api/v1/admin/profile':
 *  get:
 *     tags:
 *     - Admin
 *     summary: Get the authenticated admin's profile
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves the current user's profile information.
 *     responses:
 *      200:
 *        description: Successfully retrieved profile
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                email:
 *                  type: string
 *                fullName:
 *                  type: string
 *                phoneNumber:
 *                  type: string
 *                message:
 *                  type: string
 *                  example: "Profile fetched successfully"
 *      401:
 *        description: Unauthorized - No valid token provided
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "Invalid or missing access token"
 *      500:
 *        description: Server Error
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get list of all users
 *     tags: 
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     description: Retrieve a list of all users. Only accessible by admin users.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 60c72b2f5f1b2c001c8e4d6c
 *                   username:
 *                     type: string
 *                     example: johndoe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   role:
 *                     type: string
 *                     example: user
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Server error
 */

module.exports = adminRouter;