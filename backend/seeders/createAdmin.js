require("dotenv").config();
const bcrypt = require("bcrypt");
const { User } = require("../models");

async function createAdmin() {
  try {
    const existingAdmin = await User.findOne({
      where: { email: "admin@gmail.com" }
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created successfully");
    process.exit();

  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();