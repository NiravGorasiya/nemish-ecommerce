const { body, query } = require("express-validator");

module.exports = {
    productv: [
        body('name')
            .exists().withMessage('Name is required')
            .isString().withMessage('Name should be a valid string')
            .notEmpty().withMessage('Name cannot be empty'),
        body('title')
            .exists().withMessage('Title is required')
            .isString().withMessage('Title should be a valid string')
            .notEmpty().withMessage('Title cannot be empty'),
        body('description')
            .exists().withMessage('Description is required')
            .isString().withMessage('Description should be a valid string')
            .notEmpty().withMessage('Description cannot be empty'),
        body('subcategoryId')
            .exists().withMessage('Subcategory is required')
            .isInt().withMessage('Subcategory must be an integer'),
        body('price')
            .exists().withMessage('Price is required')
            .isFloat({ min: 0 }).withMessage('Price should be a valid number'),
        body('finalPrice')
            .exists().withMessage('Final Price is required')
            .isFloat({ min: 0 }).withMessage('Final Price should be a valid number'),
        body('status')
            .exists().withMessage('Status is required')
            .isIn(['active', 'inactive']).withMessage('Status must be active or inactive'),
        body('SKU')
            .exists().withMessage('SKU is required'),
        body('size_id')
            .exists().withMessage('Size ID is required')
            .isArray().withMessage('Size ID should be an array')
            .notEmpty().withMessage('Size ID cannot be empty'),
        body('color_id')
            .exists().withMessage("Color ID is required")
            .isArray().withMessage("Color ID should be an array")
            .notEmpty().withMessage("Color ID cannot be empty")
    ],
    getProductV: [
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be a number between 1 to 100").toInt(),
        query('page').optional().isInt({ min: 1, max: 100 }).withMessage("Page must be a number between 1 to 100").toInt(),
    ]
};
