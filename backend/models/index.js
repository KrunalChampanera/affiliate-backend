const User = require("./User")
const Category = require("./Category")
const Product = require("./Product")
const Review = require("./Review")
const Cart = require("./Cart")
const Wishlist = require("./Wishlist")
const Coupon = require("./Coupon")
const Order = require("./Order")
const OrderItem = require("./OrderItem")
const Banner = require("./Banner")
const Blog = require("./Blog")
const LoginLog = require("./loginLog")
const Author = require("./Author")

/* ======================
   USER RELATIONS
====================== */

User.hasMany(Review,{ foreignKey:"userId", onDelete:"CASCADE" })
Review.belongsTo(User,{ foreignKey:"userId" })

User.hasMany(Cart,{ foreignKey:"userId", onDelete:"CASCADE" })
Cart.belongsTo(User,{ foreignKey:"userId" })

User.hasMany(Wishlist,{ foreignKey:"userId", onDelete:"CASCADE" })
Wishlist.belongsTo(User,{ foreignKey:"userId" })

User.hasMany(Order,{ foreignKey:"userId", onDelete:"CASCADE" })
Order.belongsTo(User,{ foreignKey:"userId" })

/* LOGIN ACTIVITY */

User.hasMany(LoginLog,{ foreignKey:"userId", onDelete:"CASCADE" })
LoginLog.belongsTo(User,{ foreignKey:"userId" })

/* ======================
   CATEGORY RELATIONS
====================== */

Category.hasMany(Product,{
  foreignKey:"CategoryId",
  onDelete:"CASCADE"
})

Product.belongsTo(Category,{
  foreignKey:"CategoryId"
})

/* ======================
   COUPON RELATIONS (NEW)
====================== */

Coupon.hasMany(Product,{
  foreignKey:"couponId",
  onDelete:"SET NULL"
})

Product.belongsTo(Coupon,{
  foreignKey:"couponId"
})

/* ======================
   PRODUCT RELATIONS
====================== */

Product.hasMany(Review,{
  foreignKey:"productId",
  onDelete:"CASCADE"
})

Review.belongsTo(Product,{
  foreignKey:"productId"
})

Product.hasMany(Cart,{
  foreignKey:"productId",
  onDelete:"CASCADE"
})

Cart.belongsTo(Product,{
  foreignKey:"productId"
})

Product.hasMany(Wishlist,{
  foreignKey:"productId",
  onDelete:"CASCADE"
})

Wishlist.belongsTo(Product,{
  foreignKey:"productId"
})

Product.hasMany(OrderItem,{
  foreignKey:"productId",
  onDelete:"CASCADE"
})

OrderItem.belongsTo(Product,{
  foreignKey:"productId"
})

/* ======================
   ORDER RELATIONS
====================== */

Order.hasMany(OrderItem,{
  foreignKey:"orderId",
  onDelete:"CASCADE"
})

OrderItem.belongsTo(Order,{
  foreignKey:"orderId"
})

/* ======================
   BLOG RELATIONS
====================== */

Category.hasMany(Blog,{
  foreignKey:"CategoryId",
  onDelete:"SET NULL"
})

Blog.belongsTo(Category,{
  foreignKey:"CategoryId",
  as:"Category"
})

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
  Blog,
  Author,
  LoginLog
}