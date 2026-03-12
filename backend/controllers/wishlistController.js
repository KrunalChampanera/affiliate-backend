const { Wishlist } = require("../models");

exports.addToWishlist = async (req, res) => {
  await Wishlist.create({
    userId: req.user.id,
    productId: req.body.productId
  });
  res.status(201).json({ message: "Added to wishlist" });
};

exports.getWishlist = async (req, res) => {
  const items = await Wishlist.findAll({
    where: { userId: req.user.id }
  });
  res.json(items);
};

exports.removeFromWishlist = async (req, res) => {
  await Wishlist.destroy({
    where: { id: req.params.id, userId: req.user.id }
  });
  res.json({ message: "Removed from wishlist" });
};