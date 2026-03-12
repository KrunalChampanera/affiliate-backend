// // // const express = require("express");
// // // const upload = require("../middlewares/uploadMiddleware");
// // // const auth = require("../middlewares/authMiddleware");
// // // const admin = require("../middlewares/adminMiddleware");

// // // const {
// // //   createProduct,
// // //   getAllProducts,
// // //   getTopDealProducts,
// // //   getSingleProduct,
// // //   updateProduct,
// // //   deleteProduct,
// // //   getPopularProducts
// // // } = require("../controllers/productController");

// // // const router = express.Router();

// // // /* PUBLIC ROUTES */

// // // router.get("/", getAllProducts);
// // // router.get("/top-deals", getTopDealProducts);
// // // router.get("/:id", getSingleProduct);

// // // /* ADMIN PROTECTED ROUTES */

// // // router.post(
// // //   "/",
// // //   auth,
// // //   admin,
// // //   upload.single("image"),
// // //   createProduct
// // // );

// // // router.put(
// // //   "/:id",
// // //   auth,
// // //   admin,
// // //   upload.single("image"),
// // //   updateProduct
// // // );

// // // router.delete(
// // //   "/:id",
// // //   auth,
// // //   admin,
// // //   deleteProduct
// // // );

// // // router.get("/popular", getPopularProducts);

// // // module.exports = router;

// // const express = require("express");
// // const upload = require("../middlewares/uploadMiddleware");
// // const auth = require("../middlewares/authMiddleware");
// // const admin = require("../middlewares/adminMiddleware");

// // const {
// //   createProduct,
// //   getAllProducts,
// //   getTopDealProducts,
// //   getPopularProducts,
// //   getSingleProduct,
// //   updateProduct,
// //   deleteProduct
// // } = require("../controllers/productController");

// // const router = express.Router();

// // /* PUBLIC ROUTES */

// // router.get("/", getAllProducts);
// // router.get("/top-deals", getTopDealProducts);
// // router.get("/popular", getPopularProducts); // 🔥 MOVE THIS ABOVE :id
// // router.get("/:id", getSingleProduct);

// // /* ADMIN PROTECTED ROUTES */

// // router.post(
// //   "/",
// //   auth,
// //   admin,
// //   upload.single("image"),
// //   createProduct
// // );

// // router.put(
// //   "/:id",
// //   auth,
// //   admin,
// //   upload.single("image"),
// //   updateProduct
// // );

// // router.delete(
// //   "/:id",
// //   auth,
// //   admin,
// //   deleteProduct
// // );

// // module.exports = router;
// const express = require("express");
// const upload = require("../middlewares/uploadMiddleware");
// const auth = require("../middlewares/authMiddleware");
// const admin = require("../middlewares/adminMiddleware");

// const productController = require("../controllers/productController");

// const router = express.Router();

// /* ================= PUBLIC ROUTES ================= */

// router.get("/", productController.getAllProducts);

// router.get("/top-deals", productController.getTopDealProducts);

// router.get("/popular", productController.getPopularProducts);

// router.get("/:id", productController.getSingleProduct);

// /* ================= ADMIN ROUTES ================= */

// router.post(
//   "/",
//   auth,
//   admin,
//   upload.single("image"),
//   productController.createProduct
// );

// router.put(
//   "/:id",
//   auth,
//   admin,
//   upload.single("image"),
//   productController.updateProduct
// );

// router.delete(
//   "/:id",
//   auth,
//   admin,
//   productController.deleteProduct
// );

// module.exports = router;

const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const productController = require("../controllers/productController");

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */

// Get all products
router.get("/", productController.getAllProducts);

// Get top deal products
router.get("/top-deals", productController.getTopDealProducts);

// Get popular products
router.get("/popular", productController.getPopularProducts);

// Get single product by ID
router.get("/:id", productController.getSingleProduct);


/* ================= ADMIN ROUTES ================= */

// Create product
router.post(
  "/",
  auth,
  admin,
  upload.single("image"),
  productController.createProduct
);

// Update product
router.put(
  "/:id",
  auth,
  admin,
  upload.single("image"),
  productController.updateProduct
);

// Delete product
router.delete(
  "/:id",
  auth,
  admin,
  productController.deleteProduct
);

module.exports = router;