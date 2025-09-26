const { body, query } = require("express-validator");

module.exports = {
  productv: [
    body("name")
      .exists()
      .withMessage("Name is required")
      .isString()
      .withMessage("Name should be a valid string")
      .notEmpty()
      .withMessage("Name cannot be empty"),
    body("title")
      .exists()
      .withMessage("Title is required")
      .isString()
      .withMessage("Title should be a valid string")
      .notEmpty()
      .withMessage("Title cannot be empty"),
    body("description")
      .exists()
      .withMessage("Description is required")
      .isString()
      .withMessage("Description should be a valid string")
      .notEmpty()
      .withMessage("Description cannot be empty"),
    body("subcategoryId")
      .exists()
      .withMessage("Subcategory is required")
      .isInt()
      .withMessage("Subcategory must be an integer"),
    body("categoryId")
      .exists()
      .withMessage("Category is required")
      .isInt()
      .withMessage("Category must be an integer"),
    body("stockQuantity")
      .exists()
      .withMessage("Stock Quantity is required")
      .isInt()
      .withMessage("Stock Quantity must be an integer"),
    body("price")
      .exists()
      .withMessage("Price is required")
      .isFloat({ min: 0 })
      .withMessage("Price should be a valid number"),
    body("finalPrice")
      .exists()
      .withMessage("Final Price is required")
      .isFloat({ min: 0 })
      .withMessage("Final Price should be a valid number"),
    body("size_id")
      .exists()
      .withMessage("Size ID is required"),
    body("color_id")
      .exists()
      .withMessage("Color ID is required")
      .isArray()
      .withMessage("Color ID should be an array")
      .notEmpty()
      .withMessage("Color ID cannot be empty"),
    body("stockStatus")
      .exists()
      .withMessage("Stock Status is required")
      .notEmpty()
      .withMessage("Stock Status cannot be empty")
      .isIn(["in_stock", "out_of_stock"])
      .withMessage("Stock Status must be either 'in_stock' or 'out_of_stock'"),
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
