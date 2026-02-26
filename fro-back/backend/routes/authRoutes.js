const express = require("express");
const User = require("../models/User");
const routes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

routes.post("/create", async (req, res) => {
  try {
    const { name, email, password, mobile, gender, hobbies, role } = req.body;

    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      name,
      email,
      password: hashPassword,
      mobile,
      gender,
      hobbies,
      role,
    });

    res.json({ message: "User create successfully", createUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, findUser.password);

    if (!matchPassword) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      {
        _id: findUser._id,
        role: findUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIREIN },
    );

    res.json({ message: "Login successfully", token, findUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = routes;
