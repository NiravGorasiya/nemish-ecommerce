const router = require("express").Router();
const expressValidatorMw = require("../../middlewares/validate");
const { registerv } = require("../../validators/registerv");
const { matchedData } = require("express-validator");
const {
  userSignupCtrl,
  userloginctrl,
  loginController,
  userProfileController,
  userChangePasswordController,
  userSendEmailController,
  userResetPasswordController,
} = require("../../controller/UserController");
const { successResponse, createResponse } = require("../../utils/sendResponse");
const userAuth = require("../../middlewares/auth");

/**
 * @openapi
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with a unique email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 minLength: 5
 *                 example: mySecurePassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *       400:
 *         description: Validation error (invalid email or password too short)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email is invalid or already exists
 *       500:
 *         description: Internal server error
 */

router.post(
  "/signup",
  registerv,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const ctrlData = matchedData(req, { locations: ["body"] });
      await userSignupCtrl(ctrlData);
      createResponse(req, res, "User created Successfully");
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * @openapi
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     description: User login using  email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jasoliyanemish190@gmail.com
 *               password:
 *                 type: string
 *                 minLength: 5
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: jasoliyanemish190@gmail.com
 *       400:
 *         description: Validation error (invalid email or password too short)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email is invalid or already exists
 *       500:
 *         description: Internal server error
 */

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { token } = await loginController({ email, password });
    if (token) {
      res.send({ token });
    }
  } catch (error) {
    return next(error);
  }
});

/**
 * @openapi
 * /api/user/profile:
 *   get:
 *     summary: Get authenticated user profile
 *     description: Returns the profile information of the currently logged-in user.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []   # JWT token required
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       401:
 *         description: Unauthorized – missing or invalid JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid token or token expired
 *       500:
 *         description: Internal server error
 */

router.get("/profile", userAuth, async (req, res, next) => {
  try {
    const user = await userProfileController(req);
    return successResponse(req, res, user);
  } catch (error) {
    return next(error);
  }
});

router.post("/changepassword", userAuth, async (req, res, next) => {
  try {
    const user = await userChangePasswordController(req);
    return successResponse(req, res, "user change password successfull");
  } catch (error) {
    return next(error);
  }
});
/**
 * @openapi
 * /api/user/sendemail:
 *   post:
 *     summary: Send password reset email
 *     description: Sends a password reset link to the user's registered email address.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user send email successful
 *       400:
 *         description: Invalid email or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found with the provided email
 *       500:
 *         description: Internal server error
 */
router.post("/sendemail", async (req, res, next) => {
  const { email } = req.body;
  try {
    const token = await userSendEmailController(email);
    return successResponse(req, res, "user send email successfull");
  } catch (error) {
    return next(error);
  }
});

/**
 * @openapi
 * /api/user/reset-password/{token}:
 *   post:
 *     summary: Reset user password
 *     description: Resets the user's password using the token received via email.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The password reset token sent to the user's email
 *         schema:
 *           type: string
 *           example: abcd1234efgh5678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 5
 *                 example: myNewSecurePassword
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user password reset successful
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid or expired token
 *       500:
 *         description: Internal server error
 */
router.post("/reset-password/:token", async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await userResetPasswordController(token, password);
    return successResponse(req, res, "user password send email successfull");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
