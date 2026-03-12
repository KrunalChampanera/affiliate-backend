const { Coupon } = require("../models");

exports.createCoupon = async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json(coupon);
};

exports.getCoupons = async (req, res) => {
  const coupons = await Coupon.findAll();
  res.json(coupons);
};

exports.updateCoupon = async (req, res) => {
  await Coupon.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Coupon updated" });
};

exports.deleteCoupon = async (req, res) => {
  await Coupon.destroy({ where: { id: req.params.id } });
  res.json({ message: "Coupon deleted" });
};