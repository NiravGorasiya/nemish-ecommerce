const { Router } = require("express");

const userRouter = require("./userRouter");
const wishlistRouter = require("./wishlistRouter");


module.exports = Router()
  .use("/user", userRouter)
  .use("/wishlist", wishlistRouter)

