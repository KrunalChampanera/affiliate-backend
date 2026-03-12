const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Review = sequelize.define("Review", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: DataTypes.TEXT,
});

module.exports = Review;