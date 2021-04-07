const router = require("express").Router();
const {
  adminRegister,
  adminLogin,
  getAllAdmins,
  deleteAdmin,
  getAdminsPagin,
} = require("../controllers/adminController");

router.post("/", adminRegister);
router.post("/login", adminLogin);
router.get("/dataAdmin", getAdminsPagin);
router.get("/", getAllAdmins);
router.delete("/delete", deleteAdmin);

module.exports = router;
