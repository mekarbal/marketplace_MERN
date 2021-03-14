const router = require("express").Router();
const {
  adminRegister,
  adminLogin,
  getAllAdmins,deleteAdmin
} = require("../controllers/adminController");

router.post("/", adminRegister);
router.post("/login", adminLogin);
router.get("/", getAllAdmins);
router.delete('/delete',deleteAdmin)

module.exports = router;
