const router = require("express").Router();
const {
  superAdminRegister,
  superAdminLogin,
} = require("../controllers/superAminController");

router.post("/add", superAdminRegister);
router.post("/login", superAdminLogin);

module.exports = router;
