const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");

const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");

router.get("/", auth, getAllOrders);

router.post("/", auth, createOrder);

router.put("/:id", auth, updateOrderStatus);

router.delete("/:id", auth, deleteOrder);

module.exports = router;