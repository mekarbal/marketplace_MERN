const router = require("express").Router();
const {
  buyerRegister,
  buyerLogin,
  validBuyer,
  getAllBuyers,
} = require("../controllers/buyerController");

router.post("/", buyerRegister);
router.post("/login", buyerLogin);
router.patch("/valid", validBuyer);
router.get("/", getAllBuyers);
module.exports = router;
