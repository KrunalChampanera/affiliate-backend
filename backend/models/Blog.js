const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db");

const Blog = sequelize.define("Blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  },
  author: {
    type: DataTypes.STRING,
    defaultValue: "Admin"
  }
});

module.exports = Blog;