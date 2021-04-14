require("dotenv").config();
const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sellerValidations,
  loginValidations,
} = require("./validations/dataValidations");
const { randomPassword, sendMail } = require("./validations/methods");

exports.sellerRegister = async (req, res, next) => {
  // console.log(req.body);
  const tempPassword = randomPassword(6);
  req.body.password = tempPassword;
  const { error } = sellerValidations(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const emailExist = await Seller.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    bcrypt.genSaltSync(10),
    async function (err, hash) {
      if (hash) {
        const seller = new Seller({
          full_name: req.body.full_name,
          email: req.body.email,
          type: "Starter",
          phone: req.body.phone,
          password: hash,
          address: req.body.address,
          turnOver: 0,
          productsCount: 0,
          identity: req.body.identity,
          isValid: false,
        });
        console.log(seller);
        try {
          const savedSeller = await seller.save();
          const teminfo = {
            tempPassword,
          };
          sendMail(teminfo);
          res.send(savedSeller);
        } catch (error) {
          res.status(400).send(error);
        }
      }
    }
  );
};

exports.resetPassword = async (req, res, next) => {
  console.log(req.body);
  const token = req.header("auth-token");
  const tokenDecode = jwt.verify(token, process.env.SELLER_TOKEN);

  const { password, newPassword } = req.body;
  try {
    const seller = await Seller.findOne({ email: tokenDecode.email });
    if (seller && !seller.is_password_reset) {
      bcrypt.compare(password, seller.password, async (err, result) => {
        if (result) {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          seller.password = hashedPassword;
          seller.is_password_reset = true;
          const newPass = await seller.save();
          res.status(201).send(newPass);
        } else {
          res.status(401).send("password incorrect check your email");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.sellerLogin = async (req, res, next) => {
  // const { error } = loginValidations(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const seller = await Seller.findOne({ email: req.body.email });
  if (!seller) return res.status(400).send("Email  not found");

  const validPass = await bcrypt.compare(req.body.password, seller.password);
  if (!validPass) return res.status(400).send("Invalid password");

  bcrypt.compare(req.body.password, seller.password, function (err, isMatch) {
    if (isMatch) {
      if (seller.is_password_reset) {
        const token = jwt.sign(
          { email: seller.email, _id: seller._id, isValid: seller.isValid },
          process.env.SELLER_TOKEN
        );
        res.status(200).json({ seller, token });
      } else {
        const token = jwt.sign(
          {
            is_password_reset: seller.is_password_reset,
            _id: seller._id,
            email: seller.email,
            isValid: seller.isValid,
          },
          process.env.SELLER_TOKEN
        );
        res
          .status(200)
          .json({ seller, token, message: "redirect to reset password" });
      }
    } else {
      res.send("Password doesn't match");
    }
  });
};

exports.validSeller = async (req, res, next) => {
  const seller = await Seller.findById({ _id: req.params.id });
  if (!seller) {
    res.status(404).send({ message: "Seller not found" });
  } else {
    seller.isValid = true;
    const validSeller = await seller.save();
    res.status(201).send(validSeller);
  }
};

exports.getAllSellers = async (req, res, next) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getSellerById = async (req, res, next) => {
  try {
    const seller = await Seller.findById({ _id: req.params.id });
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sellerPack = async (req, res, next) => {
  const token = req.header("auth-token");

  const id_seller = jwt.verify(token, process.env.SELLER_TOKEN)._id;

  const type = req.body.type;

  const seller = await Seller.findById({ _id: id_seller });
  if (type == "Pro") {
    seller.type = type;
    seller.turnOver += 5000;

    const updateSeller = await seller.save();
    res.status(201).send(updateSeller);
  } else if (type == "Expert") {
    seller.type = type;
    seller.turnOver += 20000;
    const updateSeller = await seller.save();
    res.status(201).send(updateSeller);
  }
};

exports.turnOverUpdated = async (req, res, next) => {
  const seller = await Seller.findById({ _id: req.params.id });

  if (!seller) {
    res.status(404).send({ message: "Seller not found" });
  }

  seller.turnOver += req.body.turnOver;

  try {
    const sellerUpdated = await seller.save();
    res.status(201).send(sellerUpdated);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.turnOverTypeUpdated = async (req, res, next) => {
  const seller = await Seller.findById({ _id: req.params.id });

  if (!seller) {
    res.status(404).send({ message: "Seller not found" });
  }

  seller.turnOver += req.body.turnOver;
  seller.type = req.body.type;

  try {
    const sellerUpdated = await seller.save();
    res.status(201).send(sellerUpdated);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.getSellerPagin = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const sellers = await Seller.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.send(sellers);
  } catch (error) {
    res.send(error);
  }
};
