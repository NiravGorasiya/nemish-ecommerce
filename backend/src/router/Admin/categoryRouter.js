const router = require("express").Router();
const { matchedData } = require("express-validator");

const { categoryv, getCategoryV } = require("../../validators/categoryv");
const expressValidatorMw = require("../../middlewares/validate");
const { createCategoryCtrl, getCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl, getoneCategoryCtrl } = require("../../controller/Admin/Category/Category");
const { createResponse, successResponse ,deleteResponce} = require("../../utils/sendResponse");

router.post("/add", categoryv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        const category = await createCategoryCtrl(ctrlData)
        return createResponse(req, res, category);
    } catch (error) {
        return next(error);
    }
});

router.get("/all", getCategoryV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['query'] })
        const category = await getCategoryCtrl(query)
        return successResponse(req, res, category)
    } catch (error) {
        return next(error);
    }
});

router.put("/update/:id", categoryv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.categoryId = req.params.id
        const category = await updateCategoryCtrl(ctrlData)
        return successResponse(req,res, category)
    } catch (error) {
        return next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const ctrlData = { categoryId: req.params.id }
        const categoryData = await getoneCategoryCtrl(ctrlData)
        return successResponse(req, res, categoryData)
    } catch (e) {
        return next(e)
    }
})


router.delete("/:id", async (req, res, next) => {
    try {
        const destroyedCategory = await deleteCategoryCtrl({ categoryId: req.params.id })
        deleteResponce(req, res, "Category deleted successfully.");
    } catch (error) {
        return next(error)
    }
})

module.exports = router;
