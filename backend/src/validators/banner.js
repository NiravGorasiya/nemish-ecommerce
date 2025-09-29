const { body, query } = require("express-validator");

const bannerV = [
  body("title").notEmpty().withMessage("Title is required"),
  body("link_url").notEmpty().withMessage("Link URL is required"),
  body("status")
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
  body("start_date").optional().isISO8601().toDate(),
  body("end_date").optional().isISO8601().toDate(),
  body("position").optional().isString(),
];

const getBannerV = [
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1 }).toInt(),
];

module.exports = { bannerV, getBannerV };
