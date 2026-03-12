const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const {
  loginAdmin,
  getAllUsers,
  deleteUser,
  updateUser,
  getLoginLogs
} = require("../controllers/adminController");

const {
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");

const { getDashboardStats } = require("../controllers/adminDashboardController");

router.post("/login", loginAdmin);

router.get("/dashboard", auth, admin, getDashboardStats);

router.get("/users", auth, admin, getAllUsers);
router.delete("/users/:id", auth, admin, deleteUser);
router.put("/users/:id", auth, admin, updateUser);

/* LOGIN ACTIVITY ROUTE */
router.get("/logins", auth, admin, getLoginLogs);

router.get("/orders", auth, admin, getAllOrders);
router.put("/orders/:id", auth, admin, updateOrderStatus);
router.delete("/orders/:id", auth, admin, deleteOrder);

module.exports = router;