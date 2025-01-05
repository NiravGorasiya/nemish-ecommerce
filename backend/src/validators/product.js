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
            .exists().withMessage('Description  is required')
            .isString().withMessage('Description  should be a valid string')
            .notEmpty().withMessage('Description  cannot be empty'),
        body('subcategory_id')
            .exists().withMessage('The subcategory not be empty !')
            .isInt().withMessage('The Subcategory is required to be an Integer'),
        body('price')
            .exists().withMessage('Price is required')
            .isFloat({ min: 0 }).withMessage('Price should be a valid number and cannot be negative'),
        body('final_price')
            .exists().withMessage('Final Price is required')
            .isFloat({ min: 0 }).withMessage('Final Price be a valid number and cannot be negative'),
        body('status')
            .exists().withMessage('Status is required')
            .isIn(['active', 'inactive']).withMessage('Status should be either "active" or "inactive"'),
        body('SKU')
            .exists().withMessage('SKU is required'),
        body("size_id")
            .exists().withMessage("Size ID is required")
            .isArray().withMessage("Size ID should be an array")
            .notEmpty().withMessage("Size ID cannot be empty"),
        body('productColorImages').isArray().withMessage('productColorImages should be an array'),

    ],
    getProductV: [
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be a number between 1 to 100").toInt(),
        query('page').optional().isInt({ min: 1, max: 100 }).withMessage("Page must be a number between 1 to 100").toInt(),
    ]
};
