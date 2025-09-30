const { Router } = require("express");

const userRouter = require("./userRouter");
const wishlistRouter = require("./wishlistRouter");
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");
const ShippingRouterRouter = require("./shippingAddressRouter");
const ProductRouter = require("./productRouter");
const CustomerRouter = require("./customerRouter")
const categoryRouter = require("./categoryRouter")
const subCategoryRouter = require("./subCategoryRouter")

module.exports = Router()
  .use("/", userRouter)
  .use("/cart", cartRouter)
  .use("/wishlist", wishlistRouter)
  .use("/order", orderRouter)
  .use("/userproduct", ProductRouter)
  .use("/shippingaddress", ShippingRouterRouter)
  .use("/customer", CustomerRouter)
  .use("/category", categoryRouter)
  .use("/subcategory", subCategoryRouter)



