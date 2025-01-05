const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createSubCategoryCtrl, getSubCategoryCtrl, updateSubCategoryCtrl, deleteSubCategoryCtrl, getoneSubCategoryCtrl } = require("../../controller/Admin/SubCategory/SubCategory");
const { createResponse, successResponce, deleteResponce } = require("../../utils/sendResponse");
const { subcategoryv, getSubCategoryV } = require("../../validators/subcategoryv");

router.post("/add", subcategoryv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        const subcategory = await createSubCategoryCtrl(ctrlData)
        return createResponse(req, res, subcategory);
    } catch (error) {
        return next(error);
    }
});

router.get("/all", getSubCategoryV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['query'] })
        const subcategory = await getSubCategoryCtrl(query)
        return successResponce(req, res, subcategory)
    } catch (error) {
        return next(error);
    }
});

router.put("/update/:id", subcategoryv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.subCategoryId = req.params.id
        const subcategory = await updateSubCategoryCtrl(ctrlData)
        return successResponce(req, res, subcategory)
    } catch (error) {
        return next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const ctrlData = { subcategoryId: req.params.id }
        const subCategoryData = await getoneSubCategoryCtrl(ctrlData)
        return successResponce(req, res, subCategoryData)
    } catch (e) {
        return next(e)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const destroyedCategory = await deleteSubCategoryCtrl({ subCategoryId: req.params.id })
        deleteResponce(req, res, "SubCategory deleted successfully.");
    } catch (error) {
        return next(error)
    }
})

module.exports = router;
