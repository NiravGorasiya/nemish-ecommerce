require("dotenv").config();
const logger = require("./config/logger");
const express = require("express");
const app = express();
const morgan = require("morgan");
const handleErrors = require("./middlewares/handleErrors");
const path = require("path")
const cors = require('cors')
const { swaggerUi, swaggerSpec } = require("../swagger.js");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const adminRoute = require("./router/Admin/index");
const userRoute = require("./router/User/index")
require("./models/sequelize");
require("./utils/razorpay")

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", adminRoute);
app.use("/api/user", userRoute);

app.use(handleErrors);

app.get("/", (req, res) => {
  res.send(`server start`);
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(process.env.PORT, () => {
  logger.info("Listening on port " + process.env.PORT || 3001);
});
