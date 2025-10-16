const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const {
  createResponse,
  successResponse,
  deleteResponce,
} = require("../../utils/sendResponse");
const {
  getWhishlisCtrl,
  deleteWhishlistCtrl,
} = require("../../controller/User/WishlistController");
const auth = require("../../middlewares/auth");
const { productCompareV } = require("../../validators/productCompare");
const {
  createProductCompareCtrl,
  deleteProductCompareCtrl,
  getProductCompareCtrl,
} = require("../../controller/User/ProductCompareController");

/**
 * @openapi
 * /api/user/productcompare/add:
 *   post:
 *     summary: Add a product to comparison list
 *     description: Allows an authenticated user to add a product to their comparison list.
 *     tags:
 *       - Product Compare
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 10
 *                 description: The unique ID of the product to add for comparison.
 *     responses:
 *       201:
 *         description: Product successfully added to comparison list.
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
 *                   example: "Product added to comparison successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       example: 5
 *                     productId:
 *                       type: integer
 *                       example: 101
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-14T10:20:00Z"
 *       400:
 *         description: Validation failed or missing productId.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Product is required"
 *       401:
 *         description: Unauthorized — JWT token missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or expired token"
 *       500:
 *         description: Internal server error.
 */

router.post(
  "/add",
  auth,
  productCompareV,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const ctrlData = matchedData(req, { locations: ["body"] });
      console.log(req.user, "req.user");

      ctrlData.userId = req.user.Id;
      const wishlist = await createProductCompareCtrl(ctrlData);
      return createResponse(req, res, wishlist);
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * @openapi
 * /api/user/productcompare/all:
 *   get:
 *     summary: Get all wishlist items for the authenticated user
 *     description: Returns a list of products that the user has added to their wishlist.
 *     tags:
 *       - Product Compare
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of records per page (default 10)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination (default 1)
 *     responses:
 *       200:
 *         description: Product Compare items retrieved successfully
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
 *                   example: "Product Compare fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 5
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           userId:
 *                             type: integer
 *                             example: 5
 *                           productId:
 *                             type: integer
 *                             example: 202
 *                           productName:
 *                             type: string
 *                             example: "Apple iPhone 15 Pro"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-10-14T09:15:00Z"
 *       401:
 *         description: Unauthorized — JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.get("/all", auth, expressValidatorMw, async (req, res, next) => {
  try {
    const query = matchedData(req, { locations: ["query"] });
    query.userId = req.user.Id;
    const category = await getProductCompareCtrl(query);
    return successResponse(req, res, category);
  } catch (error) {
    return next(error);
  }
});

/**
 * @openapi
 * /api/user/productcompare/{id}:
 *   delete:
 *     summary: Delete a wishlist item
 *     description: Deletes a specific wishlist item by its ID.
 *     tags:
 *       - Product Compare
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the wishlist item to delete.
 *     responses:
 *       200:
 *         description: Product Compare item deleted successfully.
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
 *                   example: "Product Compare deleted successfully."
 *       404:
 *         description: Product Compare item not found.
 *       500:
 *         description: Internal server error.
 */

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteProductCompareCtrl({ wishlistId: req.params.id });
    deleteResponce(req, res, "Product Compare deleted successfully.");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
