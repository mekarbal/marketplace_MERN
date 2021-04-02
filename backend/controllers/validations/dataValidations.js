const Joi = require("joi");

const sellerValidations = (data) => {
  const sellerValidation = Joi.object({
    full_name: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(14).required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().required(),
    identity: Joi.string().required(),
  });
  return sellerValidation.validate(data);
};
const loginValidations = (data) => {
  const LoginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return LoginValidation.validate(data);
};

const buyerValidations = (data) => {
  const buyerValidation = Joi.object({
    full_name: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(14).required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().required(),
  });
  return buyerValidation.validate(data);
};
const adminValidations = (data) => {
  const adminValidation = Joi.object({
    full_name: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(14).required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().required(),
  });
  return adminValidation.validate(data);
};

exports.superAdminValidationSchema = Joi.object({
  full_name: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(14).required(),
  password: Joi.string().min(6).required(),
});

exports.sellerValidations = sellerValidations;
exports.loginValidations = loginValidations;
exports.buyerValidations = buyerValidations;
exports.adminValidations = adminValidations;
