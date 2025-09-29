const { Router } = require("express");

const userRouter = require("./userRouter");
const wishlistRouter = require("./wishlistRouter");
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");
const ShippingRouterRouter = require("./shippingAddressRouter");
const ProductRouter = require("./productRouter");
const CustomerRouter = require("./customerRouter")

module.exports = Router()
  .use("/user", userRouter)
  .use("/cart", cartRouter)
  .use("/wishlist", wishlistRouter)
  .use("/order", orderRouter)
  .use("/userproduct", ProductRouter)
  .use("/shippingaddress", ShippingRouterRouter)
  .use("/customer", CustomerRouter)
  .use("/customer", CustomerRouter)


