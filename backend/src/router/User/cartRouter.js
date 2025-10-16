const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const {
  createResponse,
  successResponse,
  deleteResponce,
} = require("../../utils/sendResponse");
const {
  createWhishlistCtrl,
} = require("../../controller/User/WishlistController");
const { cartv, getCartV } = require("../../validators/user/cart");
const {
  createCartCtrl,
  getCartCtrl,
  deleteCartCtrl,
  getoneCartCtrl,
  updateCartCtrl,
} = require("../../controller/User/CartController");
const userAuth = require("../../middlewares/auth");

/**
 * @openapi
 * /api/user/cart/add:
 *   post:
 *     summary: Add product to cart
 *     description: Adds a product to the authenticated user's cart.
 *     tags:
 *       - Cart
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
 *               - quantity
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 101
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Product added to cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added to cart successfully
 *       400:
 *         description: Validation error or invalid input.
 *       401:
 *         description: Unauthorized (Missing or invalid token).
 *       500:
 *         description: Internal server error.
 */

router.post(
  "/add",
  userAuth,
  cartv,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const ctrlData = matchedData(req, { locations: ["body"] });
      ctrlData.userId = req.user.Id;
      const wishlist = await createCartCtrl(ctrlData);
      return createResponse(req, res, wishlist);
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * @openapi
 * /api/user/cart/all:
 *   get:
 *     summary: Get all my cart product
 *     description: Get all my cart product
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []   # JWT token required
 *     responses:
 *       200:
 *         description: Successfully retrieved all cart product
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
    const category = await getCartCtrl(query);
    return successResponse(req, res, category);
  } catch (error) {
    return next(error);
  }
});

/**
 * @openapi
 * /api/user/cart/update/{id}:
 *   put:
 *     summary: Update cart item quantity
 *     description: Updates an existing cart item for the authenticated user.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The cart item ID to update.
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart item updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart item updated successfully
 *       400:
 *         description: Invalid input or cart not found.
 *       401:
 *         description: Unauthorized (Missing or invalid token).
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/update/:id",
  userAuth,
  cartv,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const ctrlData = matchedData(req, { locations: ["body"] });
      ctrlData.cartId = req.params.id;
      ctrlData.userId = req.user.Id;
      const category = await updateCartCtrl(ctrlData);
      return successResponse(req, res, category);
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * @openapi
 * /api/user/cart/{id}:
 *   get:
 *     summary: Get cart item by ID
 *     description: Fetches a single cart item using its ID.
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The cart item ID to retrieve.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Cart item details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *                 productId:
 *                   type: integer
 *                   example: 101
 *                 quantity:
 *                   type: integer
 *                   example: 2
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Cart item not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", async (req, res, next) => {
  try {
    const ctrlData = { categoryId: req.params.id };
    const cartData = await getoneCartCtrl(ctrlData);
    return successResponse(req, res, cartData);
  } catch (e) {
    return next(e);
  }
});

/**
 * @openapi
 * /api/user/cart/{id}:
 *   delete:
 *     summary: Delete cart item
 *     description: Deletes a cart item by ID.
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The cart item ID to delete.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Cart deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart deleted successfully
 *       404:
 *         description: Cart item not found.
 *       500:
 *         description: Internal server error.
 */

router.delete("/:id", async (req, res, next) => {
  try {
    const destroyedCart = await deleteCartCtrl({ cartId: req.params.id });
    deleteResponce(req, res, "Cart deleted successfully.");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
