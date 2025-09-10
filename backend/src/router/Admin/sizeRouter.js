const router = require("express").Router();
const { matchedData } = require("express-validator");

const { sizev, getSizeV } = require("../../validators/sizev");
const expressValidatorMw = require("../../middlewares/validate");
const { 
    createSizeCtrl, 
    getSizesCtrl, 
    updateSizeCtrl, 
    deleteSizeCtrl, 
    getOneSizeCtrl 
} = require("../../controller/Admin/Sizes/Sizes");
const { createResponse, successResponse, deleteResponce } = require("../../utils/sendResponse");

// Add a new Size
router.post("/add", sizev, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        const size = await createSizeCtrl(ctrlData);
        return createResponse(req, res, size);
    } catch (error) {
        return next(error);
    }
});

// Get all Sizes with Pagination
router.get("/all", getSizeV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ["query"] });
        const sizes = await getSizesCtrl(query);
        return successResponse(req, res, sizes);
    } catch (error) {
        return next(error);
    }
});

// Update a Size by ID
router.put("/update/:id", sizev, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.sizeId = req.params.id;
        const size = await updateSizeCtrl(ctrlData);
        return successResponse(req, res, size);
    } catch (error) {
        return next(error);
    }
});

// Get a single Size by ID
router.get("/:id", async (req, res, next) => {
    try {
        const ctrlData = { sizeId: req.params.id };
        const sizeData = await getOneSizeCtrl(ctrlData);
        return successResponse(req, res, sizeData);
    } catch (error) {
        return next(error);
    }
});

// Delete a Size by ID
router.delete("/:id", async (req, res, next) => {
    try {
        await deleteSizeCtrl({ sizeId: req.params.id });
        return deleteResponce(req, res, "Size deleted successfully.");
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
