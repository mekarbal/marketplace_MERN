const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    id_product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    id_seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sellers",
    },
    id_buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buyers",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    full_name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    isLivred: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
