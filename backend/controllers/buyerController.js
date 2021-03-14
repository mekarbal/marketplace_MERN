require("dotenv").config();
const Buyer = require("../models/buyer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  buyerValidations,
  loginValidations,
} = require("./validations/dataValidations");

exports.buyerRegister = async (req, res, next) => {
  const { error } = buyerValidations(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const emailExist = await Buyer.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const buyer = new Buyer({
    full_name: req.body.full_name,
    email: req.body.email,
    isValid: false,
    phone: req.body.phone,
    password: hashedPassword,
    address: req.body.address,
  });

  try {
    const savedBuyer = await buyer.save();
    res.send(savedBuyer);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.buyerLogin = async (req, res, next) => {
  const { error } = loginValidations(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const buyer = await Buyer.findOne({ email: req.body.email });
  if (!buyer) return res.status(400).send("Email  not found");

  const validPass = await bcrypt.compare(req.body.password, buyer.password);
  if (!validPass) return res.status(400).send("Invalid password");

  console.log(buyer);
  const token = jwt.sign(
    { _id: buyer._id, email: buyer.email },
    process.env.BUYER_TOKEN
  );
  res.header("auth-token", token).send(token);
};

exports.validBuyer = async (req, res, next) => {
  const token = req.header("auth-token");

  const id_buyer = jwt.verify(token, process.env.BUYER_TOKEN)._id;

  const buyer = await Buyer.findById({ _id: id_buyer });
  res.send(buyer);
  if (!buyer) {
    res.status(404).send({ message: "Buyer not found" });
  } else {
    buyer.isValid = true;
    const validBuyer = await buyer.save();
    res.status(201).send(validBuyer);
  }
};

exports.getAllBuyers = async (req, res, next) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
