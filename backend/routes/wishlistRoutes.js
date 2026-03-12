const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} = require("../controllers/wishlistController");

router.post("/", auth, addToWishlist);
router.get("/", auth, getWishlist);
router.delete("/:id", auth, removeFromWishlist);

module.exports = router;