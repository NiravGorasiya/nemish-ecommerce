const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createResponse} = require("../../utils/sendResponse");
const auth = require("../../middlewares/auth");
const { createReviewCtrl } = require("../../controller/User/ReviewController");
const { reviewV } = require("../../validators/reviewV");

router.post(
  "/add",
  auth,
  reviewV,
  expressValidatorMw,
  async (req, res, next) => {
    try {
      const ctrlData = matchedData(req, { locations: ["body"] });
      ctrlData.userId = req.user.Id;
      const wishlist = await createReviewCtrl(ctrlData);
      return createResponse(req, res, wishlist);
    } catch (error) {
      return next(error);
    }
  }
);

// router.get("/all", auth, expressValidatorMw, async (req, res, next) => {
//   try {
//     const query = matchedData(req, { locations: ["query"] });
//     query.userId = req.user.Id;
//     const category = await getWhishlisCtrl(query);
//     return successResponse(req, res, category);
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = router;
