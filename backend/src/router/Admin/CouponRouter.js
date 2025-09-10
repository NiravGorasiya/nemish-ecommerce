const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const {
  createResponse,
  successResponse,
  deleteResponce,
} = require("../../utils/sendResponse");
const {
  getCouponsCtrl,
  updateCouponCtrl,
  createCouponCtrl,
  deleteCouponCtrl,
  getOneCouponCtrl,
} = require("../../controller/Admin/Coupon/Coupon");
const { couponV, getCouponV } = require("../../validators/coupon");

router.post("/add", couponV, expressValidatorMw, async (req, res, next) => {
  try {
    const ctrlData = matchedData(req, { locations: ["body"] });
    const coupon = await createCouponCtrl(ctrlData);
    return createResponse(req, res, coupon);
  } catch (error) {
    return next(error);
  }
});

router.get("/all", getCouponV, expressValidatorMw, async (req, res, next) => {
  try {
    const query = matchedData(req, { locations: ["query"] });
    const coupons = await getCouponsCtrl(query);
    return successResponse(req, res, coupons);
  } catch (error) {
    return next(error);
  }
});

router.put(
  "/update/:id",
  couponV,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const ctrlData = matchedData(req, { locations: ["body"] });
      ctrlData.couponId = req.params.id;
      const coupon = await updateCouponCtrl(ctrlData);
      return successResponse(req, res, coupon);
    } catch (error) {
      return next(error);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const ctrlData = { couponId: req.params.id };
    const couponData = await getOneCouponCtrl(ctrlData);
    return successResponse(req, res, couponData);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteCouponCtrl({ couponId: req.params.id });
    return deleteResponce(req, res, "Colour deleted successfully.");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
