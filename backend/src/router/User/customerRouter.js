const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createResponse } = require("../../utils/sendResponse");
const { registerv } = require("../../validators/registerv");
const { customerSignupCtrl } = require("../../controller/User/CustomerContoller");

router.post("/register", registerv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        const user = await customerSignupCtrl(ctrlData)
        return createResponse(req, res, user);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;