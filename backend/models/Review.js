const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Review = sequelize.define("Review", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: DataTypes.TEXT
}, {
  tableName: "reviews",
  freezeTableName: true
});

module.exports = Review;