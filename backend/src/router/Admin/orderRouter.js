const express = require("express");
const router = express.Router();
const {
  getCustomersCtrl,
} = require("../../controller/Admin/Customer/Customer");
const { getCustomerV } = require("../../validators/customer");
const expressValidatorMw = require("../../middlewares/validate");
const { matchedData } = require("express-validator");
const { successResponse } = require("../../utils/sendResponse");
const { getOrderV } = require("../../validators/order");
const { getOrderCtrl, getOrderDetailsCtrl } = require("../../controller/Admin/Order/Order");

router.get("/all", getOrderV, expressValidatorMw, async (req, res, next) => {
  try {
    const query = matchedData(req, { locations: ["query"] });
    const orders = await getOrderCtrl(query);
    return successResponse(req, res, orders);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", getOrderV, expressValidatorMw, async (req, res, next) => {
  try {
    const query = { orderId: req.params.id };
    const orders = await getOrderDetailsCtrl(query);
    return successResponse(req, res, orders);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
