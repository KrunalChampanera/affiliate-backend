const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define("Order", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  payment: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.TEXT
  },
  phone: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM("pending", "processing", "shipped", "completed", "cancelled"),
    defaultValue: "pending"
  }
}, {
  tableName: "orders",
  freezeTableName: true
});

module.exports = Order;