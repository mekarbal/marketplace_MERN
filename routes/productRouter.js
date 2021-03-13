const router = require("express").Router();
const {
  productRegister,
  getAllProducts,
  productUpdated,
  productDeleted,
  getOneProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.post("/", productRegister);
router.put("/:id", productUpdated);
router.delete("/", productDeleted);
router.get("/:id", getOneProduct);

module.exports = router;
