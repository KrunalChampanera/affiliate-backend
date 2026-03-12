const { Order, User } = require("../models");

exports.createOrder = async (req, res) => {
  try {

    const order = await Order.create({
      userId: req.user.id,
      totalAmount: req.body.totalAmount,
      payment: req.body.payment,
      address: req.body.address,
      phone: req.body.phone
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {

    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json(orders);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message
    });

  }
};


exports.updateOrderStatus = async (req, res) => {
  try {

    await Order.update(
      { status: req.body.status },
      { where: { id: req.params.id } }
    );

    res.json({ message: "Order status updated" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {

    await Order.destroy({
      where: { id: req.params.id }
    });

    res.json({ message: "Order deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};