const router = require("express").Router();
const { matchedData } = require("express-validator");
const expressValidatorMw = require("../../middlewares/validate");
const { createResponse, successResponse, deleteResponce } = require("../../utils/sendResponse");
const { cartv, getCartV } = require("../../validators/user/cart");
const { createCartCtrl, getCartCtrl, deleteCartCtrl, getoneCartCtrl, updateCartCtrl } = require("../../controller/User/CartController");
const userAuth = require("../../middlewares/auth");
const { shippingAddressV, getshippingAddressV } = require("../../validators/user/shippingAddress");
const { createShippingAddressCtrl, getShippingAddressCtrl, updateShippingAddressCtrl, getoneShippingAddressCtrl, deleteShippingAddressCtrl } = require("../../controller/User/shippingAddressController");

router.post("/add", userAuth, shippingAddressV, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.userId = req.user.Id
        const wishlist = await createShippingAddressCtrl(ctrlData)
        return createResponse(req, res, wishlist);
    } catch (error) {
        return next(error);
    }
});

router.get("/all", getshippingAddressV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['query'] })
        const shippingAddress = await getShippingAddressCtrl(query)
        return successResponse(req, res, shippingAddress)
    } catch (error) {
        return next(error);
    }
});

router.put("/update/:id", userAuth, shippingAddressV, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.shippingAddressId = req.params.id
        const shippingAddress = await updateShippingAddressCtrl(ctrlData)
        return successResponse(req, res, shippingAddress)
    } catch (error) {
        return next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const ctrlData = { shippingAddressId: req.params.id }
        const cartData = await getoneShippingAddressCtrl(ctrlData)
        return successResponse(req, res, cartData)
    } catch (e) {
        return next(e)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        await deleteShippingAddressCtrl({ shippingAddressId: req.params.id })
        deleteResponce(req, res, "Cart deleted successfully.");
    } catch (error) {
        return next(error)
    }
})

module.exports = router;