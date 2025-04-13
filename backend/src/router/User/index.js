const { Router } = require("express");

const userRouter = require("./userRouter");
const wishlistRouter = require("./wishlistRouter");
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");
const ShippingRouterRouter = require("./shippingAddressRouter");

module.exports = Router()
  .use("/user", userRouter)
  .use("/cart", cartRouter)
  .use("/wishlist", wishlistRouter)
  .use("/order", orderRouter)
  .use("/shippingaddress", ShippingRouterRouter)

