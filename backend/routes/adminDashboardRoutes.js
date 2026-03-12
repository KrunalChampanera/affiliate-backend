const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");
const { getDashboardStats } = require("../controllers/adminDashboardController");

router.get("/dashboard", auth, admin, getDashboardStats);

module.exports = router;