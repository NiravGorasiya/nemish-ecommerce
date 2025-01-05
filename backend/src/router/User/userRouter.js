const router = require("express").Router();
const expressValidatorMw = require("../../middlewares/validate");
const {
  registerv
} = require("../../validators/registerv");
const { matchedData } = require("express-validator");
const {
  userSignupCtrl,
  userloginctrl
} = require("../../controller/UserController");
const { successResponce, createResponse } = require("../../utils/sendResponse");

// signup api
router.post("/signup", registerv, expressValidatorMw, async (req, res, next) => {
  try {
    const ctrlData = matchedData(req, { locations: ["body"] });
    await userSignupCtrl(ctrlData);
    createResponse(req, res, "User created Successfully");
  } catch (error) {
    if (error) {
      console.log(error, "err");
    }
    return next(error);
  }
});

//user login api
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token } = await userloginctrl({ email, password });
    successResponce(req, res, token);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
