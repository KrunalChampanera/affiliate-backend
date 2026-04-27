require("dotenv").config();

process.on("uncaughtException", (err) => {
  require("fs").appendFileSync("crash.log",
    "\n[" + new Date().toISOString() + "] CRASH: " + err.message + "\n" + err.stack + "\n"
  )
  console.error("❌ CRASH:", err.message)
})

process.on("unhandledRejection", (reason) => {
  require("fs").appendFileSync("crash.log",
    "\n[" + new Date().toISOString() + "] REJECTION: " + String(reason) + "\n"
  )
  console.error("❌ REJECTION:", reason)
})

const express = require("express");
const cors    = require("cors");
const { sequelize, connectDB } = require("./config/db");

require("./models");

const app = express();

// ── CORS ──────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(cors({ origin: "*", credentials: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "Backend Running Successfully" });
});

app.use("/api/users",      require("./routes/userRoutes"));
app.use("/api/admin",      require("./routes/adminRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products",   require("./routes/productRoutes"));
app.use("/api/cart",       require("./routes/cartRoutes"));
app.use("/api/wishlist",   require("./routes/wishlistRoutes"));
app.use("/api/coupons",    require("./routes/couponRoutes"));
app.use("/api/orders",     require("./routes/orderRoutes"));
app.use("/api/auth",       require("./routes/authRoutes"));
app.use("/api/banners",    require("./routes/bannerRoutes"));
app.use("/api/blogs",      require("./routes/blogRoutes"));
app.use("/api/authors",    require("./routes/authorRoutes"));

const errorHandler = require("./middlewares/errorMiddleware");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// ── Keep MySQL alive every 30 seconds ─────────────────────────
setInterval(async () => {
  try {
    await sequelize.authenticate();
  } catch (err) {
    console.error("❌ DB ping failed:", err.message);
  }
}, 30000);

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync();
    console.log("✅ Database synced successfully");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    if (error.parent) {
      console.error("SQL Error:", error.parent.sqlMessage);
    }
    process.exit(1);
  }
};

startServer();