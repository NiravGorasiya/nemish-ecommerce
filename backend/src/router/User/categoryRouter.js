const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createResponse } = require("../../utils/sendResponse");
const { getCategoryV } = require("../../validators/categoryv");
const { categoryCtrl } = require("../../controller/User/CategoryController");

router.post("/register", getCategoryV, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        const category = await categoryCtrl(ctrlData)
        return createResponse(req, res, category);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;