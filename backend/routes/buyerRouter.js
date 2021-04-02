const router = require("express").Router();
const {
  buyerRegister,
  buyerLogin,
  validBuyer,
  getAllBuyers,
  getBuyerById,
  deleteBuyerById,
} = require("../controllers/buyerController");
const { verifyAdmin } = require("../controllers/tokens/verificationAdmin");
router.post("/", buyerRegister);
router.post("/login", buyerLogin);
router.patch("/valid", verifyAdmin, validBuyer);
router.get("/account/validate/:token", verifyAdmin, validBuyer);
router.get("/:id", getBuyerById);
router.get("/", verifyAdmin, getAllBuyers);
router.delete("/:id", verifyAdmin, deleteBuyerById);
module.exports = router;
