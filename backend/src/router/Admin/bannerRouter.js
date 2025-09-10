const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createResponse, successResponse ,deleteResponce} = require("../../utils/sendResponse");
const { bannerV, getBannerV } = require("../../validators/banner");
const { createBannerCtrl, getBannerCtrl, updateBannerCtrl, getOneBannerCtrl, deleteBannerCtrl } = require("../../controller/Admin/Banner/Banner");

router.post("/add", bannerV, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        const banner = await createBannerCtrl(ctrlData)
        return createResponse(req, res, banner);
    } catch (error) {
        return next(error);
    }
});

router.get("/all", getBannerV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['query'] })
        const category = await getBannerCtrl(query)
        return successResponse(req, res, category)
    } catch (error) {
        return next(error);
    }
});

router.put("/update/:id", bannerV, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.bannerId = req.params.id
        const category = await updateBannerCtrl(ctrlData)
        return successResponse(req,res, category)
    } catch (error) {
        return next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const ctrlData = { bannerId: req.params.id }
        const categoryData = await getOneBannerCtrl(ctrlData)
        return successResponse(req, res, categoryData)
    } catch (e) {
        return next(e)
    }
})


router.delete("/:id", async (req, res, next) => {
    try {
        await deleteBannerCtrl({ bannerId: req.params.id })
        deleteResponce(req, res, "Category deleted successfully.");
    } catch (error) {
        return next(error)
    }
})

module.exports = router;
