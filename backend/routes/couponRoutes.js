const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");
const {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon
} = require("../controllers/couponController");

router.get("/", auth, admin, getCoupons);
router.post("/", auth, admin, createCoupon);
router.put("/:id", auth, admin, updateCoupon);
router.delete("/:id", auth, admin, deleteCoupon);

module.exports = router;