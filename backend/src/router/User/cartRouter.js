const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createResponse, successResponce, deleteResponce } = require("../../utils/sendResponse");
const { createWhishlistCtrl } = require("../../controller/User/WishlistController");
const { cartv, getCartV } = require("../../validators/user/cart");
const { createCartCtrl, getCartCtrl, deleteCartCtrl, getoneCartCtrl, updateCartCtrl } = require("../../controller/User/CartController");
const userAuth = require("../../middlewares/auth");

router.post("/add",userAuth, cartv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.userId = req.user.Id
        const wishlist = await createCartCtrl(ctrlData)
        return createResponse(req, res, wishlist);
    } catch (error) {
        return next(error);
    }
});

router.get("/all", getCartV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['query'] })
        const category = await getCartCtrl(query)
        return successResponce(req, res, category)
    } catch (error) {
        return next(error);
    }
});

router.put("/update/:id",userAuth, cartv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.cartId = req.params.id
        ctrlData.userId = req.user.Id
        const category = await updateCartCtrl(ctrlData)
        return successResponce(req,res, category)
    } catch (error) {
        return next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const ctrlData = { categoryId: req.params.id }
        const cartData = await getoneCartCtrl(ctrlData)
        return successResponce(req, res, cartData)
    } catch (e) {
        return next(e)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const destroyedCart = await deleteCartCtrl({ cartId: req.params.id })
        deleteResponce(req, res, "Cart deleted successfully.");
    } catch (error) {
        return next(error)
    }
})

module.exports = router;
