const { body, query } = require("express-validator");

module.exports = {
    wishlistv: [
        body('productId')
            .exists().withMessage('The product not be empty !')
            .isInt().withMessage('The categoryId is required to be an Integer')
    ],
    getSubCategoryV: [
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be a number between 1 to 100").toInt(),
        query('page').optional().isInt({ min: 1, max: 100 }).withMessage("Page must be a number between 1 to 100").toInt(),
    ]
};
