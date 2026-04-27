const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class LoginLog extends Model {}

LoginLog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "users",
      key: "id"
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  loginTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true
  }
}, {
  sequelize,
  modelName: "LoginLog",
  tableName: "loginlogs",
  freezeTableName: true,
  timestamps: true
});

module.exports = LoginLog;