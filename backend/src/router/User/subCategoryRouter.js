const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { categoryAllCtrl } = require("../../controller/User/CategoryController");
const { getCartV } = require("../../validators/user/cart");
const { successResponse } = require("../../utils/sendResponse");
const { getAllSubCategoryAllCtrl } = require("../../controller/User/SubCategoryController");

router.get("/all", getCartV, expressValidatorMw, async (req, res, next) => {
  try {
    const query = matchedData(req, { locations: ["query"] });
    const subCategory = await getAllSubCategoryAllCtrl(query);
    return successResponse(req, res, subCategory);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
