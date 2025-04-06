const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createResponse, successResponce ,deleteResponce} = require("../../utils/sendResponse");
const { wishlistv } = require("../../validators/user/wishlist");
const { createWhishlistCtrl } = require("../../controller/User/WishlistController");

router.post("/add", wishlistv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        const wishlist = await createWhishlistCtrl(ctrlData)
        return createResponse(req, res, wishlist);
    } catch (error) {
        return next(error);
    }
});

// router.get("/all", getCategoryV, expressValidatorMw, async (req, res, next) => {
//     try {
//         const query = matchedData(req, { locations: ['query'] })
//         const category = await getCategoryCtrl(query)
//         return successResponce(req, res, category)
//     } catch (error) {
//         return next(error);
//     }
// });

// router.delete("/:id", async (req, res, next) => {
//     try {
//         const destroyedCategory = await deleteCategoryCtrl({ categoryId: req.params.id })
//         deleteResponce(req, res, "Category deleted successfully.");
//     } catch (error) {
//         return next(error)
//     }
// })

module.exports = router;
