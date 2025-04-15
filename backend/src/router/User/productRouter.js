const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { successResponce } = require("../../utils/sendResponse");
const auth = require("../../middlewares/auth");
const { getUserProductCtrl } = require("../../controller/User/ProductController");

router.get("/all", async (req, res, next) => {    
    try {
        const query = matchedData(req, { locations: ['query'] })
        const category = await getUserProductCtrl(query)
        return successResponce(req, res, category)
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
