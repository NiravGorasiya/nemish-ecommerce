const { body, query } = require("express-validator");

module.exports = {
    shippingAddressV: [
        body('address')
            .exists().withMessage('Address is required')
            .isString().withMessage('Address should be a valid string'),
        body('city')
            .exists().withMessage('City is required')
            .isString().withMessage('City should be a valid string'),
        body('postalCode')
            .exists().withMessage('Postal Code is required')
            .isString().withMessage('Postal Code should be a valid string'),
        body('country')
            .exists().withMessage('Country Code is required')
            .isString().withMessage('Country Code should be a valid string'),
    ],
    getshippingAddressV: [
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be a number between 1 to 100").toInt(),
        query('page').optional().isInt({ min: 1, max: 100 }).withMessage("Page must be a number between 1 to 100").toInt(),
    ]
};
