const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createProductDetailsCtrl,getAllProdctDetailsCtrl } = require("../../controller/Admin/ProductDetails/ProductDetails");
const { createResponse, successResponce } = require("../../utils/sendResponse");
const { productDetailsValidation, getProductV } = require("../../validators/productdetails");

router.post("/add", productDetailsValidation, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        const productDetails = await createProductDetailsCtrl(ctrlData);
        return createResponse(req, res, productDetails);
    } catch (error) {
        return next(error);
    }
});

router.get("/all", getProductV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['query'] })
        const product = await getAllProdctDetailsCtrl(query)
        return successResponce(req, res, product)
    } catch (error) {
        return next(error);
    }
});

module.exports = router;