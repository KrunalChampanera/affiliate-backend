const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Banner = sequelize.define("Banner", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subtitle: DataTypes.STRING,
  image: DataTypes.STRING,
  buttonText: DataTypes.STRING,
  backgroundColor: DataTypes.STRING,
  position: DataTypes.STRING
}, {
  tableName: "banners",
  freezeTableName: true,
  timestamps: true
});

module.exports = Banner;