const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createResponse, successResponse } = require("../../utils/sendResponse");
const userAuth = require("../../middlewares/auth");
const {
  orderv,
  getOrderV,
  createOrder,
  paymentSuccess,
} = require("../../validators/user/order");
const {
  createOrderCtrl,
  getUserOrderCtrl,
  createUserOrderCtrl,
  createPaymentSuccessCtrl,
} = require("../../controller/User/OrderController");

/**
 * @openapi
 * /api/user/order/place:
 *   post:
 *     summary: Place a new order
 *     description: Creates a new order for the authenticated user with shipping details and order items.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ShippingAddressId
 *               - ShippingMethodId
 *               - items
 *               - totalAmount
 *             properties:
 *               ShippingAddressId:
 *                 type: integer
 *                 example: 10
 *               ShippingMethodId:
 *                 type: integer
 *                 example: 2
 *               items:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 101
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 499.99
 *               totalAmount:
 *                 type: number
 *                 format: float
 *                 example: 999.98
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order placed successfully
 *                 order:
 *                   type: object
 *                   properties:
 *                     orderId:
 *                       type: integer
 *                       example: 1234
 *                     userId:
 *                       type: integer
 *                       example: 5
 *                     totalAmount:
 *                       type: number
 *                       format: float
 *                       example: 999.98
 *                     status:
 *                       type: string
 *                       example: Pending
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-14T10:45:12.000Z"
 *       400:
 *         description: Validation error or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The Shipping Address Id must not be empty!"
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or expired token"
 *       500:
 *         description: Internal server error
 */
router.post(
  "/place",
  userAuth,
  orderv,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const ctrlData = matchedData(req, { locations: ["body"] });
      ctrlData.userId = req.user.Id;
      const wishlist = await createOrderCtrl(ctrlData);
      return createResponse(req, res, wishlist);
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * @openapi
 * /api/user/order/userorder:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     description: Returns a paginated list of all orders placed by the logged-in user.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of orders per page.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: "Delivered"
 *         description: Filter orders by status.
 *     responses:
 *       200:
 *         description: Successfully retrieved user orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalOrders:
 *                   type: integer
 *                   example: 25
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orderId:
 *                         type: integer
 *                         example: 1001
 *                       totalAmount:
 *                         type: number
 *                         example: 1299.99
 *                       status:
 *                         type: string
 *                         example: "Pending"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-14T11:45:00Z"
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token.
 *       500:
 *         description: Internal server error.
 */

router.get(
  "/userorder",
  userAuth,
  getOrderV,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const query = matchedData(req, { locations: ["query"] });
      query.userId = req.user.Id;
      const category = await getUserOrderCtrl(query);
      return successResponse(req, res, category);
    } catch (error) {
      return next(error);
    }
  }
);
/**
 * @openapi
 * /api/user/order/create-order:
 *   post:
 *     summary: Create a new payment order
 *     description: Creates an order for payment processing (e.g., Razorpay). Requires authentication.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *               - receipt
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Order amount in smallest currency unit (e.g., paise)
 *                 example: 99900
 *               currency:
 *                 type: string
 *                 example: "INR"
 *               receipt:
 *                 type: string
 *                 example: "order_rcptid_11"
 *     responses:
 *       201:
 *         description: Payment order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                   example: "order_EAa123xyz"
 *                 amount:
 *                   type: number
 *                   example: 99900
 *                 currency:
 *                   type: string
 *                   example: "INR"
 *                 status:
 *                   type: string
 *                   example: "created"
 *       400:
 *         description: Invalid input or missing parameters.
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/create-order",
  userAuth,
  createOrder,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const query = matchedData(req, { locations: ["body"] });
      query.userId = req.user.Id;
      const createOrder = await createUserOrderCtrl(query);
      return successResponse(req, res, createOrder);
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * @openapi
 * /api/user/order/payment-success:
 *   post:
 *     summary: Confirm successful payment
 *     description: Confirms a successful payment and updates the order status. Requires authentication.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - paymentId
 *               - signature
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "order_EAa123xyz"
 *               paymentId:
 *                 type: string
 *                 example: "pay_GHC123abc"
 *               signature:
 *                 type: string
 *                 example: "af2db68247b414fabcd123ef45c6789d9e2fd68"
 *     responses:
 *       200:
 *         description: Payment confirmed and order updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment verified and order marked as paid.
 *                 order:
 *                   type: object
 *                   properties:
 *                     orderId:
 *                       type: string
 *                       example: "order_EAa123xyz"
 *                     status:
 *                       type: string
 *                       example: "Paid"
 *                     paymentId:
 *                       type: string
 *                       example: "pay_GHC123abc"
 *       400:
 *         description: Invalid signature or missing fields.
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token.
 *       500:
 *         description: Internal server error.
 */

router.post(
  "/payment-success",
  userAuth,
  paymentSuccess,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const query = matchedData(req, { locations: ["body"] });
      query.userId = req.user.Id;
      const createOrder = await createPaymentSuccessCtrl(query);
      return successResponse(req, res, createOrder);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
