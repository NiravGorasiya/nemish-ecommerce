const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createResponse } = require("../../utils/sendResponse");
const {
  createSubScribeCtrl,
} = require("../../controller/User/SubscribeController");
const { subscribeV } = require("../../validators/user/subscribe");

/**
 * @openapi
 * /api/user/subscribe/add:
 *   post:
 *     summary: Subscribe a user via email
 *     description: Allows a user to subscribe using their email address to receive newsletters or updates.
 *     tags:
 *       - Subscribe
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
 *                 example: "example@email.com"
 *                 description: The user's email address to subscribe.
 *     responses:
 *       201:
 *         description: Subscription successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User subscribed successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "sub_123456789"
 *                     email:
 *                       type: string
 *                       example: "example@email.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-14T10:00:00Z"
 *       400:
 *         description: Validation failed — email missing or invalid.
 *       409:
 *         description: Email already subscribed.
 *       500:
 *         description: Internal server error.
 */

router.post("/add", subscribeV, expressValidatorMw, async (req, res, next) => {
  try {
    const ctrlData = matchedData(req, { locations: ["body"] });
    const wishlist = await createSubScribeCtrl(ctrlData);
    return createResponse(req, res, wishlist);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
