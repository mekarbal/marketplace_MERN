const router = require("express").Router();
const {
  addOrder,
  getAllOrders,
  getOrder,
  getAllOrdersByUserId,
  getOrderPagin,
  orderUpdated,
} = require("../controllers/orderController");
const { verifyBuyer } = require("../controllers/tokens/verificationAdmin");

router.post("/", verifyBuyer, addOrder);
router.get("/dataOrder", getOrderPagin);
router.get("/", getAllOrders);
router.get("/:id", getOrder);
router.patch("/:id", orderUpdated);
router.get("/user/:id", getAllOrdersByUserId);

module.exports = router;
