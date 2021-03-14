const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Buyer", buyerSchema);
