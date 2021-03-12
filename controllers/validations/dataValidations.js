const Joi = require("joi");

const sellerValidations = (data) => {
  const sellerValidation = Joi.object({
    full_name: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(14).required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().required(),
  });
  return sellerValidation.validate(data);
};
const sellerLoginValidations = (data) => {
  const sellerLoginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return sellerLoginValidation.validate(data);
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
const buyerLoginValidations = (data) => {
  const sellerLoginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return sellerLoginValidation.validate(data);
};

exports.sellerValidations = sellerValidations;
exports.sellerLoginValidations = sellerLoginValidations;
exports.buyerValidations = buyerValidations;
exports.buyerLoginValidations = buyerLoginValidations;
