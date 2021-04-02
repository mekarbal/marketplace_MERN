require("dotenv").config();
const SuperAdmin = require("../models/superAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  superAdminValidationSchema,
  loginValidationSchema,
} = require("./validations/dataValidations");

exports.superAdminRegister = async (req, res, next) => {
  const { error } = superAdminValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await SuperAdmin.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  //HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const superAdmin = new SuperAdmin({
    full_name: req.body.full_name,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
  });

  try {
    const savedSuperAdmin = await superAdmin.save();
    res.send(savedSuperAdmin);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.superAdminLogin = async (req, res, next) => {
  // //     console.log(req.body);
  //   const { error } = loginValidationSchema.validate(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  const superAdmin = await SuperAdmin.findOne({ email: req.body.email });
  if (!superAdmin) return res.status(400).send("Email  not found");

  const validPass = await bcrypt.compare(
    req.body.password,
    superAdmin.password
  );
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign(
    { _id: superAdmin._id, email: superAdmin.email },
    process.env.SUPER_ADMIN_TOKEN
  );
  res.header("auth-token", token).send(token);
};
