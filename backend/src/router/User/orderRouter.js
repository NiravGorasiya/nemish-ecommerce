const router = require("express").Router();
const { matchedData } = require("express-validator");

const expressValidatorMw = require("../../middlewares/validate");
const { createResponse, successResponce } = require("../../utils/sendResponse");
const userAuth = require("../../middlewares/auth");
const { orderv, getOrderV, createOrder ,paymentSuccess} = require("../../validators/user/order");
const { createOrderCtrl, getUserOrderCtrl, createUserOrderCtrl, createPaymentSuccessCtrl } = require("../../controller/User/OrderController");

router.post("/place",userAuth, orderv, expressValidatorMw, async (req, res, next) => {
    try {
        const ctrlData = matchedData(req, { locations: ["body"] });
        ctrlData.userId = req.user.Id
        const wishlist = await createOrderCtrl(ctrlData)
        return createResponse(req, res, wishlist);
    } catch (error) {
        return next(error);
    }
});

router.get("/userorder", userAuth,getOrderV, expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['query'] })
        query.userId = req.user.Id
        const category = await getUserOrderCtrl(query)
        return successResponce(req, res, category)
    } catch (error) {
        return next(error);
    }
});

router.post("/create-order", userAuth, createOrder,expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['body'] })
        query.userId = req.user.Id
        const createOrder = await createUserOrderCtrl(query)
        console.log(createOrder,'dsaf');
        
        return successResponce(req, res, createOrder)
    } catch (error) {
        return next(error);
    }
});

router.post("/payment-success", userAuth, paymentSuccess,expressValidatorMw, async (req, res, next) => {
    try {
        const query = matchedData(req, { locations: ['body'] })
        query.userId = req.user.Id
        const createOrder = await createPaymentSuccessCtrl(query)
        return successResponce(req, res, createOrder)
    } catch (error) {
        return next(error);
    }
});

module.exports = router;