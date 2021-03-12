const router = require("express").Router();
const {
  sellerRegister,
  resetPassword,
  sellerLogin,validSeller,getAllSellers
} = require("../controllers/sellerController");

const verify = require("../controllers/tokens/verficationSeller");

router.post("/", sellerRegister);
router.get('/sellers',getAllSellers)
router.patch("/update", verify, resetPassword);
router.post("/login", sellerLogin);
router.patch('/valid',verify,validSeller)

module.exports = router;
