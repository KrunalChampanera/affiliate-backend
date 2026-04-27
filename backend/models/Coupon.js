const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class Coupon extends Model {}

Coupon.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  discountType: {
    type: DataTypes.ENUM("percentage", "fixed"),
    allowNull: false,
    defaultValue: "percentage"
  },
  discountValue: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: "Coupon",
  tableName: "coupons",
  freezeTableName: true,
  timestamps: true
});

module.exports = Coupon;