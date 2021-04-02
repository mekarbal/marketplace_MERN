const router = require("express").Router();
const {
  categoryRegisterer,
  categoryDelete,
  getAllCategories,
  updateCategory,
  getOneCat,
} = require("../controllers/categoryController");
const { verifyAdmin } = require("../controllers/tokens/verificationAdmin");
const { verifySeller } = require("../controllers/tokens/verificationAdmin");

router.get("/", getAllCategories);
router.delete("/:id", verifyAdmin, categoryDelete);
router.get("/:id", verifyAdmin, getOneCat);
router.put("/:id", verifyAdmin, updateCategory);
router.post("/", verifyAdmin, categoryRegisterer);
module.exports = router;
