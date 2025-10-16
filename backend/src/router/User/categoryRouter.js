const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { categoryAllCtrl } = require("../../controller/User/CategoryController");
const { getCartV } = require("../../validators/user/cart");
const { successResponse } = require("../../utils/sendResponse");

/**
 * @openapi
 * /api/user/category/all:
 *   get:
 *     summary: Get all my category
 *     description: Get all my category
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []   # JWT token required
 *     responses:
 *       200:
 *         description: Successfully retrieved all category
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
router.get("/all", getCartV, expressValidatorMw, async (req, res, next) => {
  try {
    const query = matchedData(req, { locations: ["query"] });
    const category = await categoryAllCtrl(query);
    return successResponse(req, res, category);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
