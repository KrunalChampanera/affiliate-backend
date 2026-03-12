const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Coupon = sequelize.define("Coupon", {
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  discountType: {
    type: DataTypes.ENUM("percentage", "fixed"),
    allowNull: false,
  },
  discountValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Coupon;