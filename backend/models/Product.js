const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true
  },

  isTopDeal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  isPopular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  isNew: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  CategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

});

module.exports = Product;