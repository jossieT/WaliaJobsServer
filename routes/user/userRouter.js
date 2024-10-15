const { registerUser, userLogin, userLogout, getUserProfile, updateProfile, deleteUser, forgotPassword, resetPassword } = require('../../controllers/user/userController');
const express = require('express');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const { uploadImage } = require('../../controllers/uploadController');
const { upload } = require('../../service/uploadService');
const { userProtect, adminProtect } = require('../../utils/protect');
const userRouter = express.Router();



userRouter.post('/register', upload.single('profilePicture'), uploadImage, registerUser);

userRouter.post('/login', userLogin);

userRouter.post('/logout', userLogout);

userRouter.get('/profile', userProtect, getUserProfile);

userRouter.put('profile/:id', userProtect, updateProfile);

userRouter.delete('delete/:id', userProtect, deleteUser);

userRouter.post('/forgot-password', forgotPassword);
userRouter.patch('/reset-password/:token', resetPassword);

/** POST Methods */
    /**
     * @openapi
     * '/api/v1/user/register':
     *  post:
     *     tags:
     *     - [Auth]
     *     summary: Register as a user
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
     * '/api/v1/user/login':
     *  post:
     *     tags:
     *     - [Auth]
     *     summary: User login with email and password
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
     * '/api/v1/user/logout':
     *  post:
     *     tags:
     *     - [Auth]
     *     summary: Log out the current user
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
 * '/api/v1/user/profile':
 *  get:
 *     tags:
 *     - [Auth]
 *     summary: Get the authenticated user's profile
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
 * @openapi
 * '/api/v1/user/profile/{id}':
 *  put:
 *     tags:
 *     - [Auth]
 *     summary: Update user profile by ID
 *     security:
 *       - bearerAuth: []
 *     description: Updates the profile information of the user.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *      200:
 *        description: Successfully updated profile
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Profile updated successfully"
 *      400:
 *        description: Bad Request - Invalid input data
 *      401:
 *        description: Unauthorized - No valid token provided
 *      404:
 *        description: User not found
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/api/v1/user/delete/{id}':
 *  delete:
 *     tags:
 *     - [Auth]
 *     summary: Delete user by ID
 *     security:
 *       - bearerAuth: []
 *     description: Deletes a user account by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *      200:
 *        description: Successfully deleted user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "User deleted successfully"
 *      401:
 *        description: Unauthorized - No valid token provided
 *      404:
 *        description: User not found
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/api/v1/user/forgot-password':
 *  post:
 *     tags:
 *     - [Auth]
 *     summary: Forgot password
 *     description: Sends a password reset link to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@mail.com"
 *     responses:
 *      200:
 *        description: Password reset link sent
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Password reset link sent to email"
 *      404:
 *        description: User not found
 *      500:
 *        description: Server Error
 */


/**
 * @openapi
 * '/api/v1/user/reset-password/{token}':
 *  patch:
 *     tags:
 *     - [Auth]
 *     summary: Reset password using token
 *     description: Resets the user's password using a token from the password reset email.
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset password token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: "NewPassword123!"
 *     responses:
 *      200:
 *        description: Password reset successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Password reset successfully"
 *      400:
 *        description: Invalid token or password
 *      404:
 *        description: User not found
 *      500:
 *        description: Server Error
 */


module.exports = userRouter;