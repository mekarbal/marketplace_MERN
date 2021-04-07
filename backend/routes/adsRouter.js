const router = require("express").Router();
const { verifyAdmin } = require("../controllers/tokens/verificationAdmin");

const {
  getAllAds,
  adsRegister,
  adsDelete,getAdsPagin
} = require("../controllers/adsController");
const { uploadImage } = require("../middleware/uploadFiles");
router.get("/dataAds/", getAdsPagin);
router.get("/", getAllAds);
router.post("/", [uploadImage.array("picture", 1), verifyAdmin], adsRegister);
router.delete("/", adsDelete);

module.exports = router;
