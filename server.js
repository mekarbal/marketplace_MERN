const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./config/configs");
const sellerRouter = require("./routes/sellerRouter");
const buyerRouter = require("./routes/buyerRouter");
app.use(express.json());

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to database"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,auth-token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, POST, OPTIONS, PUT, DELETE"
  );
  next();
});

app.use("/seller", sellerRouter);
app.use("/buyer", buyerRouter);

app.listen(process.env.PORT, () => {
  console.log("connected to server " + process.env.PORT);
});
