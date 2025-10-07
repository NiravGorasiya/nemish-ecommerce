const { body, query } = require("express-validator");

module.exports = {
  subscribeV: [
    body("email")
      .exists()
      .withMessage("Email is required")
      .isString()
      .withMessage("Email should be a valid string")
  ],
  getProductV: [
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
