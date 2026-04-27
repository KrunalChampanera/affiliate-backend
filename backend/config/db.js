const { Sequelize } = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host:    process.env.DB_HOST,
    port:    process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: true
    },

    // ── Connection pool — prevents silent crash after idle ────
    pool: {
      max:     10,    // max connections open at once
      min:     0,     // min connections to keep open
      acquire: 30000, // max ms to wait for a connection (30s)
      idle:    10000, // close connection if idle for 10s
    },

    // ── Keep connection alive — prevents MySQL timeout drop ───
    dialectOptions: {
      connectTimeout: 60000,       // 60s to connect
      // Keeps the connection alive every 60 seconds
      // Prevents "Connection lost: The server closed the connection"
    },
  }
)

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log("Database Connected Successfully")
  } catch (error) {
    console.error("Database Connection Failed:", error)
    process.exit(1)
  }
}

module.exports = { sequelize, connectDB }