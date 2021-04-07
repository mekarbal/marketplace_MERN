require("dotenv").config();
const Order = require("../models/order");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
exports.addOrder = async (req, res, next) => {
  const token = req.header("auth-token");
  const id_buyer = jwt.verify(token, process.env.BUYER_TOKEN)._id;

  const newOrder = new Order({
    id_product: req.body.id_product,
    id_seller: req.body.id_seller,
    id_buyer: id_buyer,
    totalPrice: req.body.totalPrice,
    address: req.body.address,
    full_name: req.body.full_name,
    phone: req.body.phone,
    country: req.body.country,
    city: req.body.city,
    isLivred: false,
  });
  try {
    const order = await newOrder.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//get orders by user id
exports.getAllOrdersByUserId = async (req, res, next) => {
  try {
    const orders = await Order.aggregate([
      { $match: { id_buyer: mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "products",
          localField: "id_product",
          foreignField: "_id",
          as: "product",
        },
      },
    ]);
    res.status(200).send(orders);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

exports.orderUpdated = async (req, res, next) => {
  try {
    const order = await Order.findById({ _id: req.params.id });
    if (!order) {
      res.status(404).send({ message: "Order not found" });
    }
    order.isLivred = true;
    const orderUp = await order.save();
    res.status(201).send(orderUp);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.getOrderPagin = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const orders = await Order.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
};
