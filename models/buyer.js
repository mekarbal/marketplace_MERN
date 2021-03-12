const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
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
  createdat: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Buyer", buyerSchema);
