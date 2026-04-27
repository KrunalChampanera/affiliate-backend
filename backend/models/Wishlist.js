const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Wishlist = sequelize.define("Wishlist", {}, {
  tableName: "wishlists",
  freezeTableName: true
});

module.exports = Wishlist;