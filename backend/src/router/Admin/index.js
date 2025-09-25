const { Router } = require("express");
const categoryRouter = require("./categoryRouter");
const colourRouter = require("./colourRouter");
const sizesRouter = require("./sizeRouter");
const SubCategoriesRouter = require("./subCategoryRouter")
const attributeRouter = require("./attributeRouter")
const productRouter = require("./productRouter")
const customerRouter = require("./customerRouter")
const couponRouter = require("./CouponRouter")
const productDetails = require("./productDetailsRouter")
const bannerRouter = require("./bannerRouter")
const orderRouter = require("./orderRouter")

const adminRouter = Router();

adminRouter.use("/category", categoryRouter);
adminRouter.use("/attribute", attributeRouter);
adminRouter.use("/colour", colourRouter);
adminRouter.use("/size", sizesRouter);
adminRouter.use("/product", productRouter);
adminRouter.use("/subcategory", SubCategoriesRouter);
adminRouter.use("/productDetails", productDetails);
adminRouter.use("/customer", customerRouter);
adminRouter.use("/coupon", couponRouter);
adminRouter.use("/banner", bannerRouter);
adminRouter.use("/order", orderRouter);

module.exports = adminRouter;

