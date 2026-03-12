const express = require("express");
const upload = require("../middlewares/uploadMiddleware");

const {
  createBanner,
  getAllBanners,
  getTopDealBanners,
  updateBanner,
  deleteBanner
} = require("../controllers/bannerController");

const router = express.Router();

router.post("/", upload.single("image"), createBanner);

router.get("/", getAllBanners);

router.get("/top-deals", getTopDealBanners);

router.put("/:id", upload.single("image"), updateBanner);

router.delete("/:id", deleteBanner);

module.exports = router;