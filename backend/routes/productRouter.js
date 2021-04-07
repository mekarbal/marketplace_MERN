const router = require("express").Router();
const {
  productRegister,
  getAllProducts,
  productUpdated,
  productDeleted,
  getOneProduct,
  getAllProductsByUserId,
  productTurnOverUpdated,
  getProdPaginBySeller,
  getProdPagin,
} = require("../controllers/productController");

const { uploadImage } = require("../middleware/uploadFiles");
const { verifySeller } = require("../controllers/tokens/verificationAdmin");
router.get("/", getAllProducts);
router.post("/", uploadImage.array("picture", 1), productRegister);
router.put("/:id", productUpdated);
router.delete("/:id", productDeleted);
router.get("/:id", getOneProduct);
router.get("/user/:id", getAllProductsByUserId);
router.get("/dataPr/all", getProdPagin);
router.patch("/:id", productTurnOverUpdated);
router.get("/get/:id", getProdPaginBySeller);

module.exports = router;
