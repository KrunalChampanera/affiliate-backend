const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
name: {
type: DataTypes.STRING,
allowNull: false
},

email: {
type: DataTypes.STRING,
unique: true,
allowNull: false
},

password: {
type: DataTypes.STRING,
allowNull: false
},

phone: {
type: DataTypes.STRING
},

address: {
type: DataTypes.TEXT
},

role: {
type: DataTypes.ENUM("admin","user"),
defaultValue: "user"
}

});

module.exports = User;
