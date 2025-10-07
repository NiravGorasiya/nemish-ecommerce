const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createResponse} = require("../../utils/sendResponse");
const { reviewV } = require("../../validators/reviewV");
const { createSubScribeCtrl } = require("../../controller/User/SubscribeController");
const { subscribeV } = require("../../validators/user/subscribe");

router.post(
  "/add",
  subscribeV,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const ctrlData = matchedData(req, { locations: ["body"] });
      const wishlist = await createSubScribeCtrl(ctrlData);
      return createResponse(req, res, wishlist);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
