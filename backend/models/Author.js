const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")

const Author = sequelize.define("Author", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "Author",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
})

module.exports = Author