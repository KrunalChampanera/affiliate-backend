const { User, Product, Order, Category } = require("../models");

exports.getDashboardStats = async (req, res) => {
  const totalUsers = await User.count();
  const totalProducts = await Product.count();
  const totalOrders = await Order.count();
  const totalCategories = await Category.count();

  res.json({
    totalUsers,
    totalProducts,
    totalOrders,
    totalCategories
  });
};