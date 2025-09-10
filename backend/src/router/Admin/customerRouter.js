const express = require("express");
const router = express.Router()
const { getCustomersCtrl } = require("../../controller/Admin/Customer/Customer");
const { getCustomerV } = require("../../validators/customer");
const expressValidatorMw = require("../../middlewares/validate");
const { matchedData } = require("express-validator");
const { successResponse } = require("../../utils/sendResponse");

router.get("/all", getCustomerV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ["query"] });
        const customers = await getCustomersCtrl(query);
        return successResponse(req, res, customers);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;