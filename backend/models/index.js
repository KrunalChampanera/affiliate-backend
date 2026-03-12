const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Review = require("./Review");
const Cart = require("./Cart");
const Wishlist = require("./Wishlist");
const Coupon = require("./Coupon");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Banner = require("./Banner");
const Blog = require("./Blog");

/* ======================
   USER RELATIONS
====================== */

User.hasMany(Review, { foreignKey: "userId", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Cart, { foreignKey: "userId", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Wishlist, { foreignKey: "userId", onDelete: "CASCADE" });
Wishlist.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId" });

/* ======================
   CATEGORY RELATIONS
====================== */

Category.hasMany(Product, {
  foreignKey: "CategoryId",
  onDelete: "CASCADE"
});

Product.belongsTo(Category, {
  foreignKey: "CategoryId"
});

/* ======================
   PRODUCT RELATIONS
====================== */

Product.hasMany(OrderItem, {
  foreignKey: "productId",
  onDelete: "CASCADE"
});

OrderItem.belongsTo(Product, {
  foreignKey: "productId"
});

/* ======================
   ORDER RELATIONS
====================== */

Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  onDelete: "CASCADE"
});

OrderItem.belongsTo(Order, {
  foreignKey: "orderId"
});

/* ======================
   EXPORT
====================== */

module.exports = {
  User,
  Category,
  Product,
  Review,
  Cart,
  Wishlist,
  Coupon,
  Order,
  OrderItem,
  Banner,
  Blog
};