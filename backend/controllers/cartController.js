const { Cart } = require("../models");

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const exist = await Cart.findOne({
    where: { userId: req.user.id, productId }
  });

  if (exist) {
    await exist.update({ quantity: exist.quantity + quantity });
    return res.json({ message: "Cart updated" });
  }

  await Cart.create({
    userId: req.user.id,
    productId,
    quantity
  });

  res.status(201).json({ message: "Added to cart" });
};

exports.getCart = async (req, res) => {
  const items = await Cart.findAll({
    where: { userId: req.user.id }
  });
  res.json(items);
};

exports.removeFromCart = async (req, res) => {
  await Cart.destroy({
    where: { id: req.params.id, userId: req.user.id }
  });
  res.json({ message: "Removed from cart" });
};