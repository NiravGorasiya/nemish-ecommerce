const { body } = require("express-validator");

module.exports = {
  reviewV: [
    body("productId")
      .isInt({ min: 1 })
      .withMessage("Product ID must be a positive integer."),

    body("rating")
      .isInt({ min: 1, max: 5 }) 
      .withMessage("Rating must be an integer between 1 and 5."),

    body("text")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Text must be a non-empty string."),
  ]
};
