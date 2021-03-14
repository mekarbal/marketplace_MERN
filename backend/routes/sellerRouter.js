const router = require("express").Router();
const {
  sellerRegister,
  resetPassword,
  sellerLogin,
  validSeller,
  getAllSellers,
  sellerPack,
} = require("../controllers/sellerController");

const verify = require("../controllers/tokens/verficationSeller");

router.post("/", sellerRegister);
router.get("/sellers", getAllSellers);
router.patch("/update", verify, resetPassword);
router.post("/login", sellerLogin);
router.patch("/valid", verify, validSeller);
router.patch("/upgrade", sellerPack);

module.exports = router;
