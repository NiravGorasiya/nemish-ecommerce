const { body, query } = require("express-validator");

module.exports = {
    cartv: [
        body('productId')
        .optional()
        .notEmpty().withMessage('Product ID cannot be empty'),
        body("quantity")
            .exists().withMessage('Quantity is required!')
            .isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
    ],
    getCartV: [
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be a number between 1 to 100").toInt(),
        query('page').optional().isInt({ min: 1, max: 100 }).withMessage("Page must be a number between 1 to 100").toInt(),
    ]
};
