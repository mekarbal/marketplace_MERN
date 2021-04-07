const router = require("express").Router();
const {
  sellerRegister,
  resetPassword,
  sellerLogin,
  validSeller,
  getAllSellers,
  sellerPack,
  getSellerById,
  turnOverUpdated,
  turnOverTypeUpdated,
  getSellerPagin,
} = require("../controllers/sellerController");

const { verifySeller } = require("../controllers/tokens/verificationAdmin");
const { verifyAdmin } = require("../controllers/tokens/verificationAdmin");

router.post("/", sellerRegister);
router.get("/dataSeller", verifyAdmin, getSellerPagin);
router.get("/", verifyAdmin, getAllSellers);
router.patch("/update", verifySeller, resetPassword);
router.post("/login", sellerLogin);
router.patch("/valid/:id", verifyAdmin, validSeller);
router.patch("/seller/:id", turnOverUpdated);
router.get("/:id", getSellerById);
router.patch("/upgrade", sellerPack);
router.patch("/seller/packs/:id", turnOverTypeUpdated);

module.exports = router;
