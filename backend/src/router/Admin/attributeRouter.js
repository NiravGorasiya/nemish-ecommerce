const router = require("express").Router();
const { matchedData } = require("express-validator");

const { attributev, getAttributeV } = require("../../validators/attributev")
const expressValidatorMw = require("../../middlewares/validate");
const { createAttributeCtrl, getAttributeCtrl, updateAttributeCtrl, deleteAttributeCtrl, getoneAttributeCtrl } = require("../../controller/Admin/Attribute/Attribute");
const { createResponse, successResponse, deleteResponce } = require("../../utils/sendResponse");

router.post("/add", attributev, expressValidatorMw, async (req, res, next) => {
    try {
        const attributeData = matchedData(req, { locations: ["body"] });
        const attribute = await createAttributeCtrl(attributeData)
        return createResponse(req, res, attribute);
    } catch (error) {
        return next(error);
    }
});

router.get("/all", getAttributeV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['query'] })
        const attribute = await getAttributeCtrl(query)
        return successResponse(req, res, attribute)
    } catch (error) {
        return next(error);
    }
});

router.put("/update/:id", attributev, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.attributeId = req.params.id
        const attribute = await updateAttributeCtrl(ctrlData)
        return successResponse(req, res, attribute)
    } catch (error) {
        return next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const ctrlData = { attributeId: req.params.id }
        const attributeData = await getoneAttributeCtrl(ctrlData)
        return successResponse(req, res, attributeData)
    } catch (e) {
        return next(e)
    }
})


router.delete("/:id", async (req, res, next) => {
    try {
        const destroyedattribute = await deleteAttributeCtrl({ attributeId: req.params.id })
        deleteResponce(req, res, "attribute deleted successfully.");
    } catch (error) {
        return next(error)
    }
})

module.exports = router;
