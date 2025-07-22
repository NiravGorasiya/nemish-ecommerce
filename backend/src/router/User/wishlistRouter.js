const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createResponse, successResponce ,deleteResponce} = require("../../utils/sendResponse");
const { wishlistv } = require("../../validators/user/wishlist");
const { createWhishlistCtrl,getWhishlisCtrl,deleteWhishlistCtrl } = require("../../controller/User/WishlistController");
const auth = require("../../middlewares/auth");

router.post("/add", auth, wishlistv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.userId = req.user.Id
        const wishlist = await createWhishlistCtrl(ctrlData)
        return createResponse(req, res, wishlist);
    } catch (error) {
        return next(error);
    }
});

router.get("/all",auth, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['query'] })
        query.userId = req.user.Id        
        const category = await getWhishlisCtrl(query)
        return successResponce(req, res, category)
    } catch (error) {
        return next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await deleteWhishlistCtrl({ wishlistId: req.params.id })
        deleteResponce(req, res, "Wishlist deleted successfully.");
    } catch (error) {
        return next(error)
    }
})

module.exports = router;
