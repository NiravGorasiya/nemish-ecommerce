const { body, query } = require("express-validator");

module.exports = {
    bannerV: [
        body('title')
            .exists().withMessage('Title is required')
            .isString().withMessage('Title must be a string')
            .isLength({ max: 255 }).withMessage('Title must be at most 255 characters'),

        body('image_url')
            .exists().withMessage('Image URL is required')
            .isURL().withMessage('Image URL must be a valid URL')
            .isLength({ max: 512 }).withMessage('Image URL must be at most 512 characters'),

        body('link_url')
            .optional()
            .isURL().withMessage('Link URL must be a valid URL')
            .isLength({ max: 512 }).withMessage('Link URL must be at most 512 characters'),

        body('position')
            .optional()
            .isString().withMessage('Position must be a string')
            .isLength({ max: 100 }).withMessage('Position must be at most 100 characters'),

        body('start_date')
            .optional()
            .isISO8601().withMessage('Start date must be a valid date (YYYY-MM-DD)'),

        body('end_date')
            .optional()
            .isISO8601().withMessage('End date must be a valid date (YYYY-MM-DD)')
    ],

    getBannerV: [
        query('limit')
            .optional()
            .isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100")
            .toInt(),

        query('page')
            .optional()
            .isInt({ min: 1, max: 100 }).withMessage("Page must be between 1 and 100")
            .toInt(),
    ]
};
