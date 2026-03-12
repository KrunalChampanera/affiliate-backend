const { sequelize } = require("../config/db");

const Wishlist = sequelize.define("Wishlist", {});

module.exports = Wishlist;