require("dotenv").config();
const Buyer = require("../models/buyer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  buyerValidations,
  loginValidations,
} = require("./validations/dataValidations");
const { sendMail } = require("./validations/methods");

exports.buyerRegister = async (req, res, next) => {
  const { full_name, email, password, address, phone } = req.body;
  try {
    const findEmail = await Buyer.findOne({ email });
    if (findEmail) {
      res.status(404).json({ message: "this email already signUp" });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const user = new Buyer({
            full_name,
            email,
            password: hash,
            phone,
            address,
          });
          const token = jwt.sign(
            { email: user.email, password: hash },
            process.env.BUYER_TOKEN,
            { expiresIn: "10m" }
          );
          sendMail(token);
          user
            .save()
            .then((doc) => res.status(200).json({ doc, token }))
            .catch((err) => console.log(err));
        }
      });
    }
  } catch (error) {
    console.log(error);
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
  const token = req.params.token;
  const decodeToken = jwt.verify(token, process.env.BUYER_TOKEN);
  if (decodeToken) {
    const { email, password } = decodeToken;
    try {
      const findUser = await Buyer.findOne({ email });
      if (findUser) {
        bcrypt.compare(password, findUser.password, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            findUser
              .updateOne({ isValid: true }, { new: true })
              .then((doc) => res.status(202).json({ doc }))
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).send("this link is expire");
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
