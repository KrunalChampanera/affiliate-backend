const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")

const Blog = sequelize.define("Blog", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
  author: { type: DataTypes.STRING, defaultValue: "Admin" },
  CategoryId: { type: DataTypes.INTEGER, allowNull: true },      // ← has this?
  showInBlogPage: { type: DataTypes.BOOLEAN, defaultValue: false } // ← has this?
})

module.exports = Blog