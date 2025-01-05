const { body, query } = require("express-validator");

module.exports = {
    sizev: [
        body('name')
            .exists().withMessage('Name is required')
            .isString().withMessage('Name should be a valid string')
            .notEmpty().withMessage('Name cannot be empty'),
    ],
    getSizeV: [
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be a number between 1 to 100").toInt(),
        query('page').optional().isInt({ min: 1, max: 100 }).withMessage("Page must be a number between 1 to 100").toInt(),
    ]
};
