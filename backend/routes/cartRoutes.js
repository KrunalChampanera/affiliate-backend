const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const {
  addToCart,
  getCart,
  removeFromCart
} = require("../controllers/cartController");

router.post("/", auth, addToCart);
router.get("/", auth, getCart);
router.delete("/:id", auth, removeFromCart);

module.exports = router;