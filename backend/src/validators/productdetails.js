const { body, query } = require("express-validator");

module.exports = {
    productDetailsValidation: [
        body("product_id")
            .isInt({ min: 1 })
            .withMessage("Product ID must be a positive integer."),        
        body("color_id")
            .isInt({ min: 1 })
            .withMessage("Color ID must be a positive integer."),        
        body("images")
            .isArray()
            .withMessage("Images must be an array.")
            .custom((images) => {
                const allObjects = images.every((img) => typeof img === "object" && img !== null);
                if (!allObjects) {
                    throw new Error("Each image must be an object.");
                }
                return true;
            }),
    ],
    getProductV: [
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be a number between 1 to 100").toInt(),
        query('page').optional().isInt({ min: 1, max: 100 }).withMessage("Page must be a number between 1 to 100").toInt(),
    ]
};
