const router = require("express").Router();
const {
  addOrder,
  getAllOrders,
  getOrder,
} = require("../controllers/orderController");

router.post("/", addOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrder);

module.exports = router;
