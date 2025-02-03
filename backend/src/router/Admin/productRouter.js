const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { productv, getProductV } = require("../../validators/product");
const { createProductCtrl, getAllProdctCtrl, updateProductCtrl, deleteProductCtrl, getoneProductCtrl } = require("../../controller/Admin/Product/Product");
const { createResponse, successResponce, deleteResponce } = require("../../utils/sendResponse");
const upload = require("../../utils/imageupload");

router.post("/add", upload.any(), productv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        if (req.files && req.files.length > 0) {
            ctrlData.productColorImages = ctrlData.productColorImages.map((color, index) => {

                const files = req.files.filter((f) => f.fieldname === `productColorImages[${index}][image]`);

                const imageFilenames = files.map(file => file.filename);    

                return {
                    ...color,
                    images: { image: imageFilenames.length > 0 ? imageFilenames : null, status: imageFilenames[0] ? 'active' : 'inactive' }
                };
            });
        }

        const product = await createProductCtrl(ctrlData);
        return createResponse(req, res, product);
    } catch (error) {
        return next(error);
    }
});

router.get("/all", getProductV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['query'] })
        const product = await getAllProdctCtrl(query)
        return successResponce(req, res, product)
    } catch (error) {
        return next(error);
    }
});

router.put("/update/:id", productv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.productId = req.params.id
        const attribute = await updateProductCtrl(ctrlData)
        return successResponce(req, res, attribute)
    } catch (error) {
        return next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const ctrlData = { productId: req.params.id }
        const attributeData = await getoneProductCtrl(ctrlData)
        return successResponce(req, res, attributeData)
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