const router = require("express").Router();
const { verifyAdmin } = require("../controllers/tokens/verificationAdmin");

const {
  getAllDeliveryMen,
  deliveryManAdd,
  deleteDeliveryMen,
  getDeliveryMenPagin,
} = require("../controllers/DeliveryManController");
router.get("/dataDelivery/", getDeliveryMenPagin);
router.get("/", getAllDeliveryMen);
router.post("/", deliveryManAdd);
router.delete("/:id", deleteDeliveryMen);

module.exports = router;
