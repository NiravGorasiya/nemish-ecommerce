const { Router } = require("express");
const categoryRouter = require("./categoryRouter");
const colourRouter = require("./colourRouter");
const sizesRouter = require("./sizeRouter");
const SubCategoriesRouter = require("./subCategoryRouter")
const attributeRouter = require("./attributeRouter")
const productRouter = require("./productRouter")
const productDetails = require("./productDetailsRouter")
const userRouter = require("./userRouter")

const adminRouter = Router();

adminRouter.use("/category", categoryRouter);
adminRouter.use("/attribute", attributeRouter);
adminRouter.use("/colour", colourRouter);
adminRouter.use("/size", sizesRouter);
adminRouter.use("/product", productRouter);
adminRouter.use("/subcategory", SubCategoriesRouter);
adminRouter.use("/productDetails", productDetails);
adminRouter.use("/user", userRouter);

module.exports = adminRouter;

