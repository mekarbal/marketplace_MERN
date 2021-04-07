const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./config/configs");
const sellerRouter = require("./routes/sellerRouter");
const buyerRouter = require("./routes/buyerRouter");
const adminRouter = require("./routes/adminRouter");
const adsRouter = require("./routes/adsRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const superAdminRouter = require("./routes/superAdminRouter");
const orderRouter = require("./routes/orderRouter");
const deliveryManRouter = require("./routes/deliveryManRouter");

const cors = require("cors");
app.use(express.json());

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to database"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/seller", sellerRouter);
app.use("/buyer", buyerRouter);
app.use("/admin", adminRouter);
app.use("/ads", adsRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/superAdmin", superAdminRouter);
app.use("/order", orderRouter);
app.use("/delivery", deliveryManRouter);
app.listen(process.env.PORT, () => {
  console.log("connected to server " + process.env.PORT);
});
