const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { productv, getProductV } = require("../../validators/product");
const { createProductCtrl, getAllProdctCtrl, updateProductCtrl, deleteProductCtrl, getoneProductCtrl } = require("../../controller/Admin/Product/Product");
const { createResponse, successResponse, deleteResponce } = require("../../utils/sendResponse");
const upload = require("../../utils/imageupload");

router.post("/add", upload.array("images", 10), productv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        const product = await createProductCtrl(ctrlData, req.files);
        return createResponse(req, res, product);
    } catch (error) {
        return next(error);
    }
});

router.get("/all", getProductV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['query'] })
        const product = await getAllProdctCtrl(query)
        return successResponse(req, res, product)
    } catch (error) {
        return next(error);
    }
});

router.put("/update/:productId", upload.array("images",10), productv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        const productId = req.params.productId
        const attribute = await updateProductCtrl(productId, ctrlData, req.files)
        return successResponse(req, res, attribute)
    } catch (error) {
        return next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const ctrlData = { productId: req.params.id }
        const attributeData = await getoneProductCtrl(ctrlData)
        return successResponse(req, res, attributeData)
    } catch (e) {
        return next(e)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        await deleteProductCtrl({ productId: req.params.id })
        deleteResponce(req, res, "Product deleted successfully.");
    } catch (error) {
        return next(error)
    }
})


module.exports = router;