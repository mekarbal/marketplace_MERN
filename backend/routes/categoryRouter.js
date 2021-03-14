const router = require("express").Router();
const {
  categoryRegisterer,
  categoryDelete,
  getAllCategories,
  updateCategory,
} = require("../controllers/categoryController");

router.get("/", getAllCategories);
router.delete("/:id", categoryDelete);
router.put("/:id", updateCategory);
router.post("/", categoryRegisterer);
module.exports = router;
