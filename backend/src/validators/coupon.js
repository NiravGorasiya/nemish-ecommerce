const { body, query } = require("express-validator");

module.exports = {
    couponV: [
        body("code")
            .exists().withMessage("Coupon code is required")
            .isString().withMessage("Coupon code should be a valid string")
            .notEmpty().withMessage("Coupon code cannot be empty")
            .isLength({ min: 3, max: 30 }).withMessage("Coupon code must be between 3 and 30 characters"),

        body("discountType")
            .exists().withMessage("Discount type is required")
            .isIn(["percentage", "fixed"]).withMessage("Discount type must be either 'percentage' or 'fixed'"),

        body("discountValue")
            .exists().withMessage("Discount value is required")
            .isFloat({ min: 1 }).withMessage("Discount value must be a number greater than 0"),

        body("expiryDate")
            .exists().withMessage("Expiry date is required")
            .isISO8601().withMessage("Expiry date must be a valid date in ISO8601 format (YYYY-MM-DD)")
            .custom((value) => {
                if (new Date(value) < new Date()) {
                    throw new Error("Expiry date must be in the future");
                }
                return true;
            }),

        body("usageLimit")
            .optional()
            .isInt({ min: 1 }).withMessage("Usage limit must be an integer greater than 0")
            .toInt(),
         body("usedCount")
            .optional()
            .isInt({ min: 1 }).withMessage("Used count must be an integer greater than 0 ")
            .toInt(),
    ],

    getCouponV: [
        query("limit")
            .optional()
            .isInt({ min: 1, max: 100 }).withMessage("Limit must be a number between 1 and 100")
            .toInt(),

        query("page")
            .optional()
            .isInt({ min: 1 }).withMessage("Page must be a number greater than 0")
            .toInt(),
    ],
};
