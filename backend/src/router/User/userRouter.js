const router = require("express").Router();
const expressValidatorMw = require("../../middlewares/validate");
const {
  registerv
} = require("../../validators/registerv");
const { matchedData } = require("express-validator");
const {
  userSignupCtrl,
  userloginctrl,
  loginController,
  userProfileController,
  userChangePasswordController,
  userSendEmailController,
  userResetPasswordController,
} = require("../../controller/UserController");
const { successResponce, createResponse } = require("../../utils/sendResponse");
const userAuth = require("../../middlewares/auth");

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

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  try {
    const { token } = await loginController({ email, password });
    if (token) {
      res.send({ token })
    }
  } catch (error) {
    return next(error);
  }
})

router.post('/profile', userAuth, async (req, res, next) => {
  try {
    const user = await userProfileController(req);
    return successResponce(req, res, user)
  } catch (error) {
    return next(error);
  }
})

router.post('/changepassword', userAuth, async (req, res, next) => {
  try {
    const user = await userChangePasswordController(req);
    return successResponce(req, res, "user change password successfull")
  } catch (error) {
    return next(error);
  }
})

router.post('/sendemail', async (req, res, next) => {
  const { email } = req.body
  try {
    const token = await userSendEmailController(email);
    return successResponce(req, res, "user send email successfull")

  } catch (error) {
    return next(error);
  }
})

router.post('/reset-password/:token', async (req, res, next) => {
  const { token } = req.params
  const { password } = req.body
  try {
    const user= await userResetPasswordController(token,password);
    return successResponce(req, res, "user password send email successfull")

  } catch (error) {
    return next(error);
  }
})

module.exports = router;
