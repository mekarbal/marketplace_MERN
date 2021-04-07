const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.verifyAdmin = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.ADMIN_TOKEN);
    req.admin = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

exports.verifySeller = function (req, res, next) {
  const token = req.header("auth-token");

  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.SELLER_TOKEN);
    req.seller = verified;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.verifyBuyer = function (req, res, next) {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.BUYER_TOKEN);

    req.buyer = verified;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.verifySuperAdmin = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.BUYER_TOKEN);
    req.superAdmin = verified;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
