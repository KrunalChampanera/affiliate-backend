const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const LoginLog = sequelize.define("LoginLog", {

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING
  },

  loginTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }

});

module.exports = LoginLog;