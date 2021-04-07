const router = require("express").Router();
const {
  categoryRegisterer,
  categoryDelete,
  getAllCategories,
  updateCategory,
  getOneCat,
  getCatPagin,
} = require("../controllers/categoryController");
const { verifyAdmin } = require("../controllers/tokens/verificationAdmin");
const { verifySeller } = require("../controllers/tokens/verificationAdmin");

router.get("/dataCat/", getCatPagin);
router.get("/", getCatPagin);
router.delete("/:id", verifyAdmin, categoryDelete);
router.get("/:id", verifyAdmin, getOneCat);
router.put("/:id", verifyAdmin, updateCategory);
router.post("/", verifyAdmin, categoryRegisterer);
module.exports = router;
