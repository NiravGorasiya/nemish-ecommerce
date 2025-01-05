const { body, query } = require("express-validator");

module.exports = {
    colourv: [
        // Validate 'name' field
        body('name')
            .exists().withMessage('Name is required')
            .isString().withMessage('Name should be a valid string')
            .notEmpty().withMessage('Name cannot be empty'),

        // Validate 'hex_code' field
        body('hex_code')
            .exists().withMessage('Hex code is required')
            .matches(/^#[0-9A-Fa-f]{6}$/).withMessage('Hex code must be a valid hexadecimal color (e.g., #FFFFFF)')
    ],
    
    getColourV: [
        // Validate 'limit' query parameter
        query('limit')
            .optional()
            .isInt({ min: 1, max: 100 }).withMessage("Limit must be a number between 1 and 100")
            .toInt(),
        
        // Validate 'page' query parameter
        query('page')
            .optional()
            .isInt({ min: 1, max: 100 }).withMessage("Page must be a number between 1 and 100")
            .toInt()
    ]
};
