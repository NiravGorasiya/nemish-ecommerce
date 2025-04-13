const { body, query } = require("express-validator");

module.exports = {
    orderv: [
        body('ShippingAddressId')
            .exists().withMessage('The Shipping Address Id must not be empty!')
            .isInt().withMessage('Shipping Address Id must be an integer'),

        body('ShippingMethodId')
            .exists().withMessage('The Shipping Method Id must not be empty!')
            .isInt().withMessage('Shipping Method Id must be an integer'),

        body('items')
            .isArray({ min: 1 }).withMessage('Items must be a non-empty array'),

        body('items.*.productId')
            .exists().withMessage('Product ID is required')
            .isInt().withMessage('Product ID must be an integer'),

        body('items.*.quantity')
            .exists().withMessage('Quantity is required!')
            .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),

        body('items.*.price')
            .optional()
            .isFloat({ min: 0 }).withMessage('Price must be a positive number')
    ],
    getOrderV: [
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be a number between 1 to 100").toInt(),
        query('page').optional().isInt({ min: 1, max: 100 }).withMessage("Page must be a number between 1 to 100").toInt(),
    ]
};
