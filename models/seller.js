const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Seller", sellerSchema);
