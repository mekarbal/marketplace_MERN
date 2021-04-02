const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
    },
    type: {
      type: String,
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
    turnOver: {
      type: Number,
    },
    productsCount: {
      type: Number,
    },
    identity: {
      type: String,
    },
    is_password_reset: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seller", sellerSchema);
