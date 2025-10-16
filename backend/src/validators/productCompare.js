const { body, query } = require("express-validator");

module.exports = {
  productCompareV: [
    body("productId")
      .exists()
      .withMessage("Product is required")
      .isInt()
      .withMessage("ProductId must be an integer")
  ],
  getProductCompareV: [
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Limit must be a number between 1 to 100")
      .toInt(),
    query("page")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Page must be a number between 1 to 100")
      .toInt(),
  ],
};
