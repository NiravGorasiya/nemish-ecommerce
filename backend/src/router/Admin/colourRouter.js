const router = require("express").Router();
const { matchedData } = require("express-validator");

const { colourv, getColourV } = require("../../validators/colourv");
const expressValidatorMw = require("../../middlewares/validate");
const { 
    createColourCtrl, 
    getColoursCtrl, 
    updateColourCtrl, 
    deleteColourCtrl, 
    getOneColourCtrl 
} = require("../../controller/Admin/Colour/Colour");
const { createResponse, successResponce, deleteResponce } = require("../../utils/sendResponse");

// Add a new Colour
router.post("/add", colourv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        const colour = await createColourCtrl(ctrlData);
        return createResponse(req, res, colour);
    } catch (error) {
        return next(error);
    }
});

// Get all Colours with Pagination
router.get("/all", getColourV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ["query"] });
        const colours = await getColoursCtrl(query);
        return successResponce(req, res, colours);
    } catch (error) {
        return next(error);
    }
});

// Update a Colour by ID
router.put("/update/:id", colourv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.colourId = req.params.id;
        const colour = await updateColourCtrl(ctrlData);
        return successResponce(req, res, colour);
    } catch (error) {
        return next(error);
    }
});

// Get a single Colour by ID
router.get("/:id", async (req, res, next) => {
    try {
        const ctrlData = { colourId: req.params.id };
        const colourData = await getOneColourCtrl(ctrlData);
        return successResponce(req, res, colourData);
    } catch (error) {
        return next(error);
    }
});

// Delete a Colour by ID
router.delete("/:id", async (req, res, next) => {
    try {
        await deleteColourCtrl({ colourId: req.params.id });
        return deleteResponce(req, res, "Colour deleted successfully.");
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
