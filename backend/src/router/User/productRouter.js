const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { successResponse } = require("../../utils/sendResponse");
const auth = require("../../middlewares/auth");
const {
  getUserProductCtrl,
  getUserProductDetailCtrl,
} = require("../../controller/User/ProductController");

router.get("/all", async (req, res, next) => {
  try {
    const query = matchedData(req, { locations: ["query"] });
    const category = await getUserProductCtrl(query);
    return successResponse(req, res, category);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {    
    const products = await getUserProductDetailCtrl(req.params.id);
    return successResponse(req, res, products);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
